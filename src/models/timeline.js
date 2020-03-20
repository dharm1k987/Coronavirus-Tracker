const {
    Timeline
  } = require('../schemas');
  
  const getTimelines = async () => {
    const timelinesDeath = await Timeline.find({type: 'deaths'});
    const timelinesRecovered = await Timeline.find({type: 'recovered'});
    const timelinesConfirmed = await Timeline.find({type: 'confirmed'});

    let obj = {
      timelinesDeath: timelinesDeath,
      timelinesRecovered: timelinesRecovered,
      timelinesConfirmed: timelinesConfirmed
    }

    return obj;
  };

  const getTimelinesOf = async (country) => {
    const timelinesDeath = await Timeline.find({type: 'deaths', country: country});
    const timelinesRecovered = await Timeline.find({type: 'recovered', country: country});
    const timelinesConfirmed = await Timeline.find({type: 'confirmed', country: country});

    let obj = {
      timelinesDeath: timelinesDeath,
      timelinesRecovered: timelinesRecovered,
      timelinesConfirmed: timelinesConfirmed
    }
    
    return obj;
  };
  
  const postTimeline = async (timeline, type) => {
    let updated = true;
    console.log(type)
    const newTimeline = await Timeline.updateOne({ country: timeline.country, type: type }, { data: timeline.data, type: type },
       { upsert: true });
    return updated;
  };

module.exports = {
    postTimeline,
    getTimelines,
    getTimelinesOf,
}
  
//   module.exports = {
//     getStats,
//     postStats,
//     getStatsOf
//   };
  
  