const wtf = require('wtf_wikipedia')


wtf.fetch('Template:2019–20_coronavirus_pandemic_data/China_medical_cases_by_province').then(doc => {
    // this table is oriented the other way (provinces are columns not rows)
    let data = doc.tables(0).json()
    let start = false
    let provinces = [
        {Hubei: {}},
        {Hunan: {}},
        {Henan: {}},
        {Guangdong: {}},
        {Guangxi: {}},
        {Hainan: {}},
        {Shanghai: {}},
        {Zhejiang: {}},
        {Jiangsu: {}},
        {Shandong: {}},
        {Anhui: {}},
        {Jiangxi: {}},
        {Fujian: {}},
        {Beijing: {}},
        {Tianjin: {}},
        {Hebei: {}},
        {Shanxi: {}},
        {'Inner Mongolia': {}},
        {Heilongjiang: {}},
        {Jilin: {}},
        {Liaoning: {}},
        {Chongqing: {}},
        {Sichuan: {}},
        {Yunnan: {}},
        {Guizhou: {}},
        {Tibet: {}},
        {Shaanxi: {}},
        {Gansu: {}},
        {Ningxia: {}},
        {Xinjiang: {}},
        {Qinghai: {}},
    ]
    for (let i in data) {
        if (data[i].col1.text === 'Total confirmed') start = true
        if (!start) continue
        // console.log(data[i])
        // col3 is the first province
        p = 0
        let text = 'active cases'
        if (data[i].col1.text === 'Total recovery') text = 'recovered'
        if (data[i].col1.text === 'Total deaths') text = 'deaths'
        for (let j in data[i]) {
            if (j === 'col1' || j === 'col2') continue
            let name = Object.keys(provinces[p])
            provinces[p][name][text] = data[i][j].number
            p += 1
            if (p == 31) break
        }

        // break after total deaths
        if (text === 'deaths') break
    }
    console.log(provinces)
  })

return
 
wtf.fetch('Template:2019–20_coronavirus_pandemic_data/Canada_medical_cases_by_province').then(doc => {
  let data = doc.tables(0).json()
  for (let i in data) {
      console.log("%s | Deaths: %s | Recoveries : %s | Cases: %s", data[i].Province.text, data[i].Deaths.number, data[i]['Recov.'].number, data[i].Active.number)
  }
})


wtf.fetch('Template:2019–20 coronavirus pandemic data/United States medical cases by state').then(doc => {
    let data = doc.tables(0).json()
    let count = 0
    for (let i in data) {
        if (count !== 2) {
            count += 1
            continue
        }
        console.log(data[i].col2.text) // state
        console.log(data[i].col3.number ? data[i].col3.number : 0) // cases
        console.log(data[i].col4.number ? data[i].col4.number : 0) // deaths
        console.log(data[i].col5.number ? data[i].col5.number : 0) // recovered
        return
    }
  })
