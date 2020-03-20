const fetch = require('node-fetch');
const csv = require('@fast-csv/parse');
const axios = require('axios');

let data = []; 
let dates = [];
let countryToTotal = {};

let types = ['Confirmed', 'Deaths', 'Recovered']

types.forEach(type => {
  let url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-${type}.csv`;
  axios.get(url)
  .then(function (response) {
    parseData(response.data, type.toLowerCase())
  })
  .catch(function (error) {
    console.log(error);
  })
});


const parseData = (contents, type) => {
  csv.parseString(contents)
  .on('error', error => console.error(error))
  .on('data', row => data.push(row))
  .on('end', rowCount => {
    if (dates.length == 0) {
      for (let i = 4; i < data[0].length; i++) {
        dates.push(data[0][i]);
      }
    }

    
    for (let i = 1; i < rowCount; i++) {
      let country = data[i][1].toLowerCase();

      if (!(country in countryToTotal)) {
        // setup initial mapping
        countryToTotal[country] = dates.map(date => {
          let obj = {};
          obj[[date]] = 0;
          return obj;
        });
      }

      for (let j = 0; j < dates.length; j++) {
        let date = dates[j];
        let toAddValue = parseInt(data[i][j + 4], 10);
        countryToTotal[country][j][date] += toAddValue;
      }
      let finalObj = {
        country: country,
        data: countryToTotal[country]
      }

      fetch(`http://localhost:9000/timeline/update/${type}`, {
          method: 'post',
          body: JSON.stringify({
            newTimeline: finalObj
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .catch(err => {
          console.log("An error occured, email admins:")
          console.log(err)
          return
        })

    }   
    
  });
}


