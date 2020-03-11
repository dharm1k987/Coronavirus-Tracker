const scrape = require('website-scraper');
const options = {
  urls: ['https://www.worldometers.info/coronavirus/'],
  directory: './path',
};

const parser = require('parse5');

const fs = require('fs');
 
// with async/await
// const result = scrape(options);
 
// with promise
// scrape(options).then((result) => {});
 
// or with callback
scrape(options, (error, result) => {

    fs.readFile('./path/index.html', function(err, data) {
      let d = data.toString();
 
      let l = d.match(/<tr>(.*)<\/tr>/g);
      let s = l[0].split('</tr>');
      
      for (let i = 1; i < s.length - 1; i++ ){
        let p = s[i].match(/<td(.*)<\/td>/g);
        p[0] = p[0].replace(/ /g,'')
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
        // if (final[1] == "0") { final.splice(1, 10)}

        // fix 0 in first position, why?
        // fix country names with spaces
        // make into json
        console.log(final.join(' '));
      }
      
      

// console.log(found);
    })
});