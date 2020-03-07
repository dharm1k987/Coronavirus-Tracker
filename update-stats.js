// NOTE: This file is a ONEOFF and not associated with the server!

const fs = require('fs');
const fetch = require('node-fetch');

const fileName = "stats/coronavirus-list-stats.csv";

/**
 * Removes double quotes and 
 * number-separation commas from given csv-style string
 * Also removes the \r and \n from strings
 */
const stripPunctuation = (str) => {
  let isInQuotes = false;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '\"') {
      str = str.substring(0, i) + str.substring(i + 1);
      isInQuotes = !isInQuotes;
    }
    if (isInQuotes && str[i] === ",") {
      str = str.substring(0, i) + (i === (str.length - 1) ? "" : str.substring(i + 1));
    }
  }
  return str;
}

const uploadStats = async () => {
  const data = fs.readFileSync(fileName);
  console.log(data.toString().split('\n')[0]);
  let cList = data.toString().split('\n').map(stripPunctuation);
  let formattedList = [];
  for (let i = 0; i < cList.length; i++) {
    let c = cList[i].split(',');
    let countryObj = {
      country: c[0],
      totalCases:         (c.length > 1 ? Number(c[1]) : 0),
      newCases:           (c.length > 2 ? Number(c[2]) : 0),
      totalDeaths:        (c.length > 3 ? Number(c[3]) : 0),
      newDeaths:          (c.length > 4 ? Number(c[4]) : 0),
      activeCases:        (c.length > 5 ? Number(c[5]) : 0),
      totalRecovered:     (c.length > 6 ? Number(c[6]) : 0),
      seriousAndCritical: (c.length > 7 ? Number(c[7]) : 0),
    }
    formattedList.push(countryObj);
  }
  const res2 = await fetch('http://localhost:9000/live-stats/update', {
    method: 'post',
    body: JSON.stringify({
      newStats: formattedList
    }),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());

  console.log(res2);
  
};
uploadStats();

