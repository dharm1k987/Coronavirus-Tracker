const {
  Stat
} = require('../schemas');

const getStats = async () => {
  const stats = await Stat.find({});
  return stats;
};

const postStat = async (stats) => {
  const newStat = await Stat.create(...stats);
  return newStat;
};

module.exports = {
  getStats
};

