const {
    Timeline
  } = require('../schemas');

const countryReplace = require('../helpers/countryReplace').countryReplace;
  
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
    country = country.toUpperCase()
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
    timeline.country = timeline.country.toUpperCase();

    if (timeline.country == 'KOREA, SOUTH') timeline.country = 'SOUTH KOREA';
    if (timeline.country == 'S. KOREA') timeline.country = 'SOUTH KOREA';
    if (timeline.country == 'TAIWAN*') timeline.country = 'TAIWAN';
    if (timeline.country == 'CONGO (KINSHASA)') timeline.country = 'CONGO';
    if (timeline.country == "COTE D'IVOIRE") timeline.country = 'IVORY COAST';
    if (timeline.country == 'CONGO (BRAZZAVILLE)') timeline.country = 'CONGO';
    if (timeline.country == 'BAHAMAS, THE') timeline.country = 'BAHAMAS';
    if (timeline.country == 'GAMBIA, THE') timeline.country = 'GAMBIA';
    if (timeline.country == 'UK') timeline.country = 'UNITED KINGDOM';
    if (timeline.country == 'US') timeline.country = 'USA';
    if (timeline.country.includes('DIAMOND')) timeline.country = 'DIAMOND PRINCESS'
    if (timeline.country.includes('UNION')) timeline.country = 'REUNION'
    if (timeline.country.includes('CURA')) timeline.country = 'CURACAO'
    if (timeline.country.includes('ZAANDAM')) timeline.country = 'MS ZAANDAM'
    if (timeline.country.includes('TOTAL:')) timeline.country = 'TOTAL:'

    const newTimeline = await Timeline.updateOne({ country: timeline.country, type: type }, { data: timeline.data, type: type },
       { upsert: true });
    return updated;
  };

module.exports = {
    postTimeline,
    getTimelines,
    getTimelinesOf,
}
