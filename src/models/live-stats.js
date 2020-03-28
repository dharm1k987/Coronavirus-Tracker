const {
  Stat
} = require('../schemas');

const countryReplace  = require('../helpers/countryReplace').countryReplace;

const getStats = async () => {
  const stats = await Stat.find({});
  return stats;
};

const postStats = async (stats) => {
  let updated = true;
  for (let i = 0; i < stats.length; i++) {

    stats[i].country = stats[i].country.toUpperCase();

    if (stats[i].country == 'KOREA, SOUTH') stats[i].country = 'SOUTH KOREA';
    if (stats[i].country == 'S. KOREA') stats[i].country = 'SOUTH KOREA';
    if (stats[i].country == 'TAIWAN*') stats[i].country = 'TAIWAN';
    if (stats[i].country == 'CONGO (KINSHASA)') stats[i].country = 'CONGO';
    if (stats[i].country == "COTE D'IVOIRE") stats[i].country = 'IVORY COAST';
    if (stats[i].country == 'CONGO (BRAZZAVILLE)') stats[i].country = 'CONGO';
    if (stats[i].country == 'BAHAMAS, THE') stats[i].country = 'BAHAMAS';
    if (stats[i].country == 'GAMBIA, THE') stats[i].country = 'GAMBIA';
    if (stats[i].country == 'UK') stats[i].country = 'UNITED KINGDOM';
    if (stats[i].country == 'US') stats[i].country = 'USA';
    if (stats[i].country.includes('DIAMOND')) stats[i].country = 'DIAMOND PRINCESS'
    if (stats[i].country.includes('UNION')) stats[i].country = 'REUNION'
    if (stats[i].country.includes('CURA')) stats[i].country = 'CURACAO'
    if (stats[i].country.includes('TOTAL:')) country = 'TOTAL:'

    const newStat = await Stat.updateOne(
      { country: stats[i].country },
      { ...stats[i] },
      { upsert: true }
    );
  }
  return updated;
};

const getStatsOf = async (country) => {
  country = country.toUpperCase()
  const countryStats = await Stat.findOne({ country });
  return countryStats;
};

module.exports = {
  getStats,
  postStats,
  getStatsOf
};

