const {
    Timeline
  } = require('../schemas');
  
//   const getStats = async () => {
//     const stats = await Stat.find({});
//     return stats;
//   };
  
  const postTimeline = async (timeline) => {
    let updated = true;
    console.log(timeline.length)

    for (let i = 0; i < timeline.length; i++) {
    //   const newTimeline = await Timeline.updateOne(
    //     { country: stats[i].country },
    //     { ...stats[i] },
    //     { upsert: true }
    //   );
    }
    return updated;
  };
  
//   const getStatsOf = async (country) => {
//     const countryStats = await Stat.findOne({ country });
//     return countryStats;
//   };

module.exports = {
    postTimeline
}
  
//   module.exports = {
//     getStats,
//     postStats,
//     getStatsOf
//   };
  
  