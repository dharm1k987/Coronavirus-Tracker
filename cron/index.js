const scrape = require('website-scraper');
const options = {
  urls: ['https://www.worldometers.info/coronavirus/'],
  directory: './path',
};

const parser = require('parse5');

const fs = require('fs');

const json2xls = require('json2xls');

 
// with async/await
// const result = scrape(options);
 
// with promise
// scrape(options).then((result) => {});
 
// or with callback
let objArray = [];
scrape(options, (error, result) => {

    fs.readFile('./path/index.html', function(err, data) {
      let d = data.toString();
 
      let l = d.match(/<tr>(.*)<\/tr>/g);
      let s = l[0].split('</tr>');
      
      for (let i = 1; i < s.length - 1; i++ ){
        let p = s[i].match(/<td(.*)<\/td>/g);
        // p[0] = p[0].replace(/ /g,'')
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
        if (final[1] == "0") { final.splice(1, 1)}
        final = final.map((f) => { if (!isNaN(f)) {return parseInt(f)} return f} )

        let obj = {
          country: final[0],
          totalCases: final[1],
          newCases: final[2],
          totalDeaths: final[3],
          newDeaths: final[4],
          totalRecovered: final[5],
          activeCases: final[6],
          seriousCases: final[8],
          casesPerMil: final[8]
        }
        // fix 0 in first position, why?
        // fix country names with spaces
        // make into json
        objArray.push(obj);
        
      }

      console.log(objArray);

      // let xls = json2xls(objArray)
      // fs.writeFileSync('data.xlsx', xls, 'binary');
      
      

// console.log(found);
    })

});