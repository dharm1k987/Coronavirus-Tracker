const scrape = require('website-scraper');
const options = {
 urls: ['https://www.worldometers.info/coronavirus/'],
 directory: './path',
};

const fetch = require('node-fetch');
const fs = require('fs');


let objArray = [];
scrape(options, (error, result) => {

 fs.readFile('./path/index.html', function(err, data) {
  let d = data.toString();

  let l = d.match(/<tr>(.*)<\/tr>/g);
  let s = l[0].split('</tr>');

  for (let i = 1; i < s.length - 1; i++) {
   let p = s[i].match(/<td(.*)<\/td>/g);
   p[0] = p[0].replace(/ /g, '')
   p[0] = p[0].replace(/<!--(.*?)-->/g, ' ');
   p[0] = p[0].replace(/>\s*<\/td>/g, ">0</td>")

   p[0] = p[0].replace(/<td(.*?)>/g, ' ');
   p[0] = p[0].replace(/<\/td>/g, ' ');
   p[0] = p[0].replace(/<a(.*?)>/g, ' ');
   p[0] = p[0].replace(/<\/a>/g, ' ');
   p[0] = p[0].replace(/\+/g, '');
   p[0] = p[0].replace(/\-/g, '');
   p[0] = p[0].replace(/\,/g, '');


   let final = p[0].split(' ');

   final = final.filter((f) => f != "");
   if (final[1] == "0") {
    final.splice(1, 1)
   }
   final = final.map((f) => {
    if (!isNaN(f)) {
     return parseInt(f)
    }
    return f
   })



   let obj = {
    country: final[0],
    totalCases: final[1],
    newCases: final[2],
    totalDeaths: final[3],
    newDeaths: final[4],
    totalRecovered: final[5],
    activeCases: final[6],
    seriousAndCritical: final[7]
   }

   if (obj.country.includes('S.Korea')) {
    obj.country = 'S. Korea'
   }
   if (obj.country.includes('DiamondPrincess')) {
    obj.country = 'Diamond Princess'
   }
   if (obj.country.includes('HongKong')) {
    obj.country = 'Hong Kong'
   }
   if (obj.country.includes('SanMarino')) {
    obj.country = 'San Marino'
   }
   if (obj.country.includes('SaudiArabia')) {
    obj.country = 'Saudi Arabia'
   }
   if (obj.country.includes('SouthAfrica')) {
    obj.country = 'SouthAfrica'
   }
   if (obj.country.includes('NorthMacedonia')) {
    obj.country = 'North Macedonia'
   }
   if (obj.country.includes('BosniaandHerzegovina')) {
    obj.country = 'Bosnia and Herzegovina'
   }
   if (obj.country.includes('DominicanRepublic')) {
    obj.country = 'Dominican Republic'
   }
   if (obj.country.includes('NewZealand')) {
    obj.country = 'New Zealand'
   }
   if (obj.country.includes('FrenchGuiana')) {
    obj.country = 'French Guiana'
   }
   if (obj.country.includes('BurkinaFaso')) {
    obj.country = 'Burkina Faso'
   }
   if (obj.country.includes('FaeroeIslands')) {
    obj.country = 'Faeroe Islands'
   }
   if (obj.country.includes('ChannelIslands')) {
    obj.country = 'Channel Islands'
   }
   if (obj.country.includes('SaintMartin')) {
    obj.country = 'Saint Martin'
   }
   if (obj.country.includes('IvoryCoast')) {
    obj.country = 'Ivory Coast'
   }
   if (obj.country.includes('FrenchPolynesia')) {
    obj.country = 'French Polynesia'
   }
   if (obj.country.includes('VaticanCity')) {
    obj.country = 'Vatican City'
   }
   if (obj.country.includes('union')) {
    obj.country = 'Reunion'
   }
   if (obj.country.includes('St.Barth')) {
    obj.country = 'St. Barth'
   }
   if (obj.country.includes('Total:')) {
    obj.country = 'Total:'
   }



   obj.country = obj.country.toLowerCase();




   objArray.push(obj);

  }
  // outside for loop

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

});