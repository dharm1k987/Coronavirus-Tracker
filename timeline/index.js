const csv = require('@fast-csv/parse');
const axios = require('axios'); // can u type?

let data = []; // stores our rows
let dates = []; // stores the dates in the header
let countryToTotal = {}; // maps each country to an array which contains date to value mappings

let finalArrayConfirmed = []; // stores all the json objects to pass to backend
let finalArrayDeaths = []; // stores all the json objects to pass to backend
let finalArrayRecovered = []; // stores all the json objects to pass to backend

async function helper(type) {
    // type = Confirmed, Deaths or Recovered
    let url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_${type}_global.csv`;
    let res = await axios.get(url); // res = content of csv file
    await parseData(res.data, type.toLowerCase()) // WAIT for parsing to complete, we need to parse csv's separately
}

async function main() {
  await helper('confirmed'); // parse the Confirmed csv, WAIT for this to complete before moving on
  data = []; countryToTotal = {}; // reset data structures
  
  await helper('recovered'); // parse the Recovered csv, WAIT for this to complete before moving on
  data = []; countryToTotal = {}; // reset data structures

  await helper('deaths'); // parse the Deaths csv

  await finalArrayConfirmed.forEach((c) => {
    Object.keys(c).forEach(country => {
      axios.post(`http://localhost:9000/timeline/update/confirmed`, {
        newTimeline: { country: country, data: c[country] }
      })
    })

  })
  await finalArrayDeaths.forEach((c) => {
    Object.keys(c).forEach(function(country) {
      axios.post(`http://localhost:9000/timeline/update/deaths`, {
        newTimeline: { country: country, data: c[country] }
      })
    })
  })
  await finalArrayRecovered.forEach((c) => {
    Object.keys(c).forEach(function(country) {
      axios.post(`http://localhost:9000/timeline/update/recovered`, {
        newTimeline: { country: country, data: c[country] }
      })
    })
  })
}



const parseData = async (contents, type) => {
 
  return new Promise(function(resolve, reject) {
    csv.parseString(contents)
    .on('error', error => console.error(error))
    .on('data', row => data.push(row))
    .on('end', rowCount => {
      // this adds the in the header to the array, only occurs once
      if (dates.length == 0) {
        for (let i = 4; i < data[0].length; i++) {
          dates.push(data[0][i]);
        }
      }

      // all the rows are stored in data array, go through each row
      // details are not important here
      for (let i = 1; i < rowCount; i++) {
        let country = data[i][1].toLowerCase();

        // if we haven't mapped this country yet, then set up something like this:
        if (!(country in countryToTotal)) {
          countryToTotal[country] = dates.map(date => {
            let obj = {};
            obj["date"] = date;
            obj["value"] = 0;
            return obj;
          });  
        }

        // otherwise, figure out what to add, details not important
        for (let j = 0; j < dates.length; j++) {
          let date = dates[j];
          let toAddValue = parseInt(data[i][j + 4], 10);  
          // find the index where this date
          // return new Error("stop")
          countryToTotal[country][j].value += toAddValue;
        }
      }

      console.log(type)

      if (type == 'confirmed') finalArrayConfirmed.push(countryToTotal)
      if (type == 'deaths') finalArrayDeaths.push(countryToTotal)
      if (type == 'recovered') finalArrayRecovered.push(countryToTotal)
      resolve();

    });
  })
 
}



main();