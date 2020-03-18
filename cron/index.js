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

    let l = d.match(/<tr>(.*)<\/tr>/g); // match the <tr> .. </tr>
    let s = l[0].split('</tr>');

    for (let i = 1; i < s.length - 1; i++) {

      let p = s[i].match(/<td(.*)<\/td>/g); // find all the <td> tags
      p[0] = p[0].replace(/<!--(.*?)-->/g, ' '); // remove the comments
      let r = p[0].match(/>.*?<\/td>/g); // match between the <td> tags

      y = r.map((r1) => {
        let regex = "";
        if (r1.includes('</a>')) {
          // country case is special
          regex = /.+(>.+)<\/a>/g;
          r1 = regex.exec(r1)[1]
        }
        r1 = r1.replace(/\+|-|>|,|<\/td>/g, '');
        r1 = r1.trim();
        if (r1 == '') r1 = 0;
        if (!isNaN(r1)) {
          r1 = parseInt(r1)
        }
        return r1
      })

      let obj = {
        country: y[0],
        totalCases: y[1],
        newCases: y[2],
        totalDeaths: y[3],
        newDeaths: y[4],
        totalRecovered: y[5],
        activeCases: y[6],
        seriousAndCritical: y[7]
      }

      if (obj.country.includes('Diamond Princess')) obj.country = 'Diamond Princess'
      if (obj.country.includes('union')) obj.country = 'Reunion'
      if (obj.country.includes('Cura')) obj.country = 'Curacao'
      if (obj.country.includes('Total:')) obj.country = 'Total:'

      obj.country = obj.country.toLowerCase();
      objArray.push(obj);

      if (obj.country == 'total:') break;

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

});
