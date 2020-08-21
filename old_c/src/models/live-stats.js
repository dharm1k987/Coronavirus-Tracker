const {
  Stat,
  StateInfo
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

    stats[i].country = await countryReplace(stats[i].country)
    
    const newStat = await Stat.updateOne(
      { country: stats[i].country },
      { ...stats[i] },
      { upsert: true }
    );
  }
  return updated;
};

const postStateStats = async (statesStats) => {
  const stateInfos = [
    ...statesStats[0].stateList.map(s => { return { country: statesStats[0].country, ...s }}),
    ...statesStats[1].stateList.map(s => { return { country: statesStats[1].country, ...s }}),
    ...statesStats[2].stateList.map(s => { return { country: statesStats[2].country, ...s }}),
  ];
  for (let i = 0; i < stateInfos.length; i++) {
    const updatedStates = await StateInfo.updateOne(
      { country: stateInfos[i].country, state: stateInfos[i].state },
      { ...stateInfos[i], },
      { upsert: true }
    );
  }
  return true;
};

const getStateStatsByCountry = async (country) => {
  const stateStats = await StateInfo.find({ country });
  return stateStats;
}

const getStatsOf = async (country) => {
  const countryStats = await Stat.findOne({ country });
  return countryStats;
};

module.exports = {
  getStats,
  postStats,
  postStateStats,
  getStatsOf,
  getStateStatsByCountry
};