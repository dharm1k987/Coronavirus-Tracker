const {
  Stat
} = require('../schemas');

const getStats = async () => {
  const stats = await Stat.find({});
  return stats;
};

const postStats = async (stats) => {
  let updated = true;
  for (let i = 0; i < stats.length; i++) {
    const newStat = await Stat.updateOne(
      { country: stats[i].country },
      { ...stats[i] },
      { upsert: true }
    );
  }
  return updated;
};

const getStatsOf = async (country) => {
  const countryStats = await Stat.findOne({ country });
  return countryStats;
};

module.exports = {
  getStats,
  postStats,
  getStatsOf
};

