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
    country = country.toLowerCase()
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
    timeline.country = timeline.country.toLowerCase();

    if (timeline.country == 'korea, south') timeline.country = 's. korea';
    if (timeline.country == 'taiwan*') timeline.country = 'taiwan';
    if (timeline.country == 'congo (kinshasa)') timeline.country = 'congo';
    if (timeline.country == "cote d'ivoire") timeline.country = 'ivory coast';
    if (timeline.country == 'congo (brazzaville)') timeline.country = 'congo';
    if (timeline.country == 'bahamas, the') timeline.country = 'bahamas';
    if (timeline.country == 'gambia, the') timeline.country = 'gambia';
    if (timeline.country == 'united kingdom') timeline.country = 'uk';
    if (timeline.country == 'us') timeline.country = 'usa';



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
  
  