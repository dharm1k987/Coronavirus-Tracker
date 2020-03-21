const fetch = require('node-fetch');
const csv = require('@fast-csv/parse');
const axios = require('axios');

let data = []; 
let dates = [];
let countryToTotal = {};

let types = ['Confirmed', 'Deaths', 'Recovered']

async function main(type) {
  // for (let i = 0; i < types.length; i++) {
    // let type = types[i];
    let url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-${type}.csv`;
    let res = await axios.get(url);
    let res2 = await parseData(res.data, type.toLowerCase())
    data = []
    countryToTotal = {}
  // }

}

async function main2() {
  await main('Confirmed')
  data = [];
  countryToTotal = {};
  await main('Deaths')
  data = [];
  countryToTotal = {};
  await main('Recovered')
}



const parseData = (contents, type) => {
  let allRows = contents.split('\n');
  
  // can do the following once
  let row = allRows.map(r => r.trim().split(','))
  if (dates.length == 0) {
    for (let i = 4; i < row[0].length; i++) {
      dates.push(row[0][i])
    }
  }

  let rowCount = row.length;
  for (let i = 1; i < rowCount; i++) {
    let country = row[i][1].toLowerCase();
    
    if (!(country in countryToTotal)) {
      // setup inital mapping
      countryToTotal[country] = dates.map(date => {
        let obj = {};
        obj[[date]] = 0;
        return obj;
      });

    }
  
    // console.log(dates)

    for (let j = 0; j < dates.length; j++) {
      let date = dates[j];
      let toAddValue = parseInt(row[i][j + 4], 10);

      countryToTotal[country][j][date] += toAddValue;
    }
    let finalObj = {
      country: country,
      data: countryToTotal[country]
    }
    // console.log(finalObj)

    axios.post(`http://localhost:9000/timeline/update/${type}`, {
      newTimeline: finalObj
    }).catch(err => {
      console.log("An error occured, email admins:")
      console.log(err)
      return
    })
    
  }
}



main2();