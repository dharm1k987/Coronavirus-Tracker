const csv = require('@fast-csv/parse');
const axios = require('axios');

let data = []; // stores our rows
let dates = []; // stores the dates in the header
let countryToTotal = {}; // maps each country to an array which contains date to value mappings

let finalArrayConfirmed = []; // stores all the json objects to pass to backend
let finalArrayDeaths = []; // stores all the json objects to pass to backend
let finalArrayRecovered = []; // stores all the json objects to pass to backend

async function helper(type) {
    // type = Confirmed, Deaths or Recovered
    let url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-${type}.csv`;
    let res = await axios.get(url); // res = content of csv file
    await parseData(res.data, type.toLowerCase()) // WAIT for parsing to complete, we need to parse csv's separately
}

async function main() {
  await helper('Confirmed'); // parse the Confirmed csv, WAIT for this to complete before moving on
  data = []; countryToTotal = {}; // reset data structures
  
  await helper('Recovered'); // parse the Recovered csv, WAIT for this to complete before moving on
  data = []; countryToTotal = {}; // reset data structures

  await helper('Deaths'); // parse the Deaths csv

  // await finalArrayConfirmed.forEach((country) => {
  //     axios.post(`http://localhost:9000/timeline/update/confirmed`, {
  //       newTimeline: finalArrayConfirmed[country]
  //     })
  // })

}



const parseData = (contents, type) => {
 
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
        // countryToTotal = { 'canada': [{'1/21': 0}, {'1/22': 0}, ...], ...}
        if (!(country in countryToTotal)) {
          countryToTotal[country] = dates.map(date => {
            let obj = {};
            obj[[date]] = 0;
            return obj;
          });  
        }

        // otherwise, figure out what to add, details not important
        for (let j = 0; j < dates.length; j++) {
          let date = dates[j];
          let toAddValue = parseInt(data[i][j + 4], 10);  
          countryToTotal[country][j][date] += toAddValue;
        }
      }

      if (type == 'Confirmed') finalArrayConfirmed.push(countryToTotal)
      if (type == 'Deaths') finalArrayDeaths.push(countryToTotal)
      if (type == 'Recovered') finalArrayRecovered.push(countryToTotal)

    });
}



main();

  // to fix:

  // contents = contents.replace("Korea, South", 'South Korea')
  // contents = contents.replace('Taiwan*', 'Taiwan')
  // contents = contents.replace('Congo (Kinshasa)', 'Congo')
  // contents = contents.replace("Cote d'Ivoire", 'Ivory Coast')
  // contents = contents.replace("Congo (Brazzaville)", 'Ivory Coast')
  // contents = contents.replace("Bahamas, The", 'Bahamas')
  // contents = contents.replace("Gambia, The", 'Gambia') 

  // contents = contents.replace("'", '')