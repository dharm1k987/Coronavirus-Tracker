const scrape = require('website-scraper');
const options = {
  urls: ['https://www.worldometers.info/coronavirus/'],
  directory: './path',
};

const tabletojson = require('tabletojson').Tabletojson;
const fetch = require('node-fetch');
const fs = require('fs');
const url = 'https://worldometers.info/coronavirus/';

let objArray = [];

scrape(options, (error, result) => {

  const html = fs.readFileSync('./path/index.html');
  let tablesAsJson = tabletojson.convert(html);

  // {
  //   'Country,Other': 'San Marino',
  //   TotalCases: '308',
  //   NewCases: '+29',
  //   TotalDeaths: '34',
  //   NewDeaths: '',
  //   TotalRecovered: '45',
  //   ActiveCases: '229',
  //   'Serious,Critical': '14',
  //   'Tot Cases/1M pop': '9,077',
  //   'Deaths/1M pop': '1,002',
  //   TotalTests: '722',
  //   'Tests/\n1M pop': '21,278',
  //   Continent: 'Europe'
  // }

  for (let i = 0; i < tablesAsJson[0].length; i++) {
    let y = tablesAsJson[0][i];

    let obj = {
      country: y['Country,Other'],
      totalCases: y['TotalCases'] ? parseInt(y['TotalCases'].replace(/\,/g, ''), 10) : 0,
      newCases: y['NewCases'] ? parseInt(y['NewCases'].replace(/\+|\-|\,/g, ''), 10) : 0,
      totalDeaths: y['TotalDeaths'] ? parseInt(y['TotalDeaths'].replace(/\,/g, ''), 10) : 0,
      newDeaths: y['NewDeaths'] ? parseInt(y['NewDeaths'].replace(/\+|\-|\,/g, ''), 10) : 0,
      totalRecovered: y['TotalRecovered'] ? parseInt(y['TotalRecovered'].replace(/\,/g, ''), 10) : 0,
      activeCases: y['ActiveCases'] ? parseInt(y['ActiveCases'].replace(/\,/g, ''), 10) : 0,
      seriousAndCritical: y['Serious,Critical'] ? parseInt(y['Serious,Critical'].replace(/\,/g, ''), 10) : 0,
      continent: y['Continent']
    }

    if (obj.country.includes('Diamond Princess')) obj.country = 'Diamond Princess'
    if (obj.country.includes('union')) obj.country = 'Reunion'
    if (obj.country.includes('Cura')) obj.country = 'Curacao'
    if (obj.country.includes('Zaandam')) obj.country = 'MS Zandam'
    if (obj.country.includes('Total:')) obj.country = 'Total:'

    // new row added, serves same purpose as total, so just ignore it
    if (obj.country === 'World') continue

    obj.country = obj.country.toUpperCase();
    objArray.push(obj);

    if (obj.country == 'TOTAL:') break;

  }

  console.log("Pushing to server...");
  fetch('http://localhost:9000/live-stats/update', {
      method: 'post',
      body: JSON.stringify({
        newStats: objArray
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(res => {
      console.log("Done! Here is a snippet of the result: ");
      console.log(res.stats[0]);
    })
    .catch(err => {
      console.log("An error occured, email admins:")
      console.log(err)
    })


})