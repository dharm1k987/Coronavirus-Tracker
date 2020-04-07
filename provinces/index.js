const wtf = require('wtf_wikipedia')

 
wtf.fetch('Template:2019–20_coronavirus_pandemic_data/China_medical_cases_by_province').then(doc => {
    // this table is oriented the other way (provinces are columns not rows)
    let data = doc.tables(0).json()
    let start = false
    let provinces = [
        'HUBEI',
        'HUNAN',
        'HENAN',
        'GUANGDONG',
        'GUANGXI',
        'HAINAN',
        'SHANGHAI',
        'ZHEJIANG',
        'JIANGSU',
        'SHANDONG',
        'ANHUI',
        'JIANGXI',
        'FUJIAN',
        'BEIJING',
        'TIANJIN',
        'HEBEI',
        'SHANXI',
        'INNER MONGOLIA',
        'HEILONGJIANG',
        'JILIN',
        'LIAONING',
        'CHONGQING',
        'SICHUAN',
        'YUNNAN',
        'GUIZHOU',
        'TIBET',
        'SHAANXI',
        'GANSU',
        'NINGXIA',
        'XINJIANG',
        'QINGHAI',
    ]

    let result = provinces.map(p => {
        return { state: p }
    })
  
    for (let i in data) {
        if (data[i].col1.text === 'Total confirmed') start = true
        if (!start) continue

        // col3 is the first province
        p = 0
        let text = 'active cases'
        if (data[i].col1.text === 'Total recovery') text = 'recovered'
        if (data[i].col1.text === 'Total deaths') text = 'deaths'
        for (let j in data[i]) {
            if (j === 'col1' || j === 'col2') continue
            result[p][text] = data[i][j].number
            p += 1
            if (p == 31) break
        }

        // break after total deaths
        if (text === 'deaths') break
    }
    console.log(result)
  })

return



  wtf.fetch('Template:2019–20_coronavirus_pandemic_data/Canada_medical_cases_by_province').then(doc => {
    let data = doc.tables(0).json()
    let result = []
    for (let i in data) {
        let obj = {
            state: data[i].Province.text.toUpperCase(),
            activeCases: data[i].Active.number,
            totalRecovered: data[i]['Recov.'].number,
            totalDeaths: data[i].Deaths.number

        }
        result.push(obj)
        // stop after Nunavut
        if (obj.state === 'NUNAVUT') break
    }

    console.log(result)
  })



wtf.fetch('Template:2019–20 coronavirus pandemic data/United States medical cases by state').then(doc => {
    let data = doc.tables(0).json()
    let result = []
    let count = 0
    for (let i in data) {
        if (count !== 2) {
            count += 1
            continue
        }

        let obj = {
            state: data[i].col2.text.toUpperCase(),
            activeCases: data[i].col3.number ? data[i].col3.number : 0,
            totalRecovered: data[i].col5.number ? data[i].col5.number : 0,
            totalDeaths: data[i].col4.number ? data[i].col4.number : 0

        }

        result.push(obj)
        // stop after Wyoming
        if (obj.state === 'WYOMING') break
    }

    console.log(result)
  })