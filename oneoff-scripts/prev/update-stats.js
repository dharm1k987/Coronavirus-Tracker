// NOTE: This file is a ONEOFF and not associated with the server!

const fs = require('fs');
const fetch = require('node-fetch');
const moment = require('moment');

const fileName = "stats/coronavirus-update-" + moment().format('MM-DD-YYYY') + ".xlsx";

console.log("Updating with file: " + fileName);

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
  let cList = data.toString().split('\n').map(stripPunctuation);
  let formattedList = [];
  for (let i = 0; i < cList.length; i++) {
    let c = cList[i].split(',');
    if (c[0] === "") continue;
    let countryObj = {
      country: c[0].toLowerCase(),
      totalCases:         (c.length > 1 ? Number(c[1]) : 0),
      newCases:           (c.length > 2 ? Number(c[2]) : 0),
      totalDeaths:        (c.length > 3 ? Number(c[3]) : 0),
      newDeaths:          (c.length > 4 ? Number(c[4]) : 0),
      totalRecovered:     (c.length > 5 ? Number(c[5]) : 0),
      activeCases:        (c.length > 6 ? Number(c[6]) : 0),
      seriousAndCritical: (c.length > 7 ? Number(c[7]) : 0),
    }
    formattedList.push(countryObj);
  }
  console.log(formattedList) 
};
uploadStats();

