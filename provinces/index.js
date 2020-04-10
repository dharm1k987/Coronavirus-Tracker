const wtf = require('wtf_wikipedia')

async function china() {
    // https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data/China_medical_cases_by_province
    const doc = await wtf.fetch('Template:2019–20_coronavirus_pandemic_data/China_medical_cases_by_province')
    // this table is oriented the other way (provinces are columns not rows)
    let data = doc.tables(0).json()
    let start = false
    let provinces = [
        'HUBEI', 'HUNAN', 'HENAN', 'GUANGDONG', 'GUANGXI', 'HAINAN', 'SHANGHAI', 'ZHEJIANG', 'JIANGSU', 'SHANDONG',
        'ANHUI', 'JIANGXI', 'FUJIAN', 'BEIJING', 'TIANJIN', 'HEBEI', 'SHANXI', 'INNER MONGOLIA', 'HEILONGJIANG',
        'JILIN', 'LIAONING', 'CHONGQING', 'SICHUAN', 'YUNNAN', 'GUIZHOU', 'TIBET', 'SHAANXI', 'GANSU', 'NINGXIA',
        'XINJIANG', 'QINGHAI',
    ]

    let result = provinces.map(p => {
        return { state: p }
    })

    for (let i in data) {
        if (data[i].col1.text === 'Total confirmed') start = true
        if (!start) continue

        // col3 is the first province
        p = 0
        let textProper = 'activeCases'
        if (data[i].col1.text === 'Total recovery') textProper = 'totalRecovered'
        if (data[i].col1.text === 'Total deaths') textProper = 'totalDeaths'
        for (let j in data[i]) {
            if (j === 'col1' || j === 'col2') continue
            result[p][textProper] = data[i][j].number
            p += 1
            if (p == 31) break
        }

        // break after total deaths
        if (textProper === 'totalDeaths') break
    }
    return result;

}

async function canada() {
    // https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data/Canada_medical_cases_by_province
    const doc = await wtf.fetch('Template:2019–20_coronavirus_pandemic_data/Canada_medical_cases_by_province');
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
    return result;

}

async function usa() {
    // https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data/United_States_medical_cases_by_state
    const doc = await wtf.fetch('Template:2019–20 coronavirus pandemic data/United States medical cases by state');
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
    return result;
}


async function main() {
    // console.log(await china())
    // console.log(await canada())
    console.log(await usa());
    
    // each of these will return an array like: [ {state: ..., activeCases: ..., totalRecovered: ..., totalDeaths: ...}, {...}]
    // one by one, do a fetch call similar to how we did in here: https://github.com/track-coronavirus/oneoff-scripts/blob/master/cron/index.js#L67
    // except you'll have to do it for all three countries
}

main()
