async function countryReplace(country) {
    return new Promise(function(resolve, reject) {
        if (country == 'KOREA, SOUTH') country = 'SOUTH KOREA';
        if (country == 'S. KOREA') country = 'SOUTH KOREA';
        if (country == 'TAIWAN*') country = 'TAIWAN';
        if (country == 'CONGO (KINSHASA)') country = 'CONGO';
        if (country == "COTE D'IVOIRE") country = 'IVORY COAST';
        if (country == 'CONGO (BRAZZAVILLE)') country = 'CONGO';
        if (country == 'BAHAMAS, THE') country = 'BAHAMAS';
        if (country == 'GAMBIA, THE') country = 'GAMBIA';
        if (country == 'UK') country = 'UNITED KINGDOM';
        if (country == 'US') country = 'USA';
        if (country == 'CZECHIA') country = 'CZECH REPUBLIC';
        if (country == 'GUINEABISSAU') country = 'GUINEA-BISSAU';
        if (country == 'TIMORLESTE') country = 'TIMOR-LESTE';
        if (country == 'CAR') country = 'CENTRAL AFRICAN REPUBLIC';
        if (country.includes('DIAMOND')) country = 'DIAMOND PRINCESS'
        if (country.includes('UNION')) country = 'REUNION'
        if (country.includes('CURA')) country = 'CURACAO'
        if (country.includes('ZAANDAM')) country = 'MS ZAANDAM'
        if (country.includes('TOTAL:')) country = 'TOTAL:'
    
        return resolve(country)
    })

}

module.exports = { countryReplace }