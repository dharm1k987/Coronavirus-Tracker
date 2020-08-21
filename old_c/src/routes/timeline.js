const {
    postTimeline,
    getTimelines,
    getTimelinesOf
  } = require('../models');
  
  module.exports = app => {

    app.get('/timelines', async (req, res, next) => {
      // all timelines
      const timelines = await getTimelines();
      res.set('Cache-Control', 'public, max-age=300').send(timelines);
    });

    app.get('/timelines/:country', async (req, res, next) => {
      const { country } = req.params;
      const countryTimelines = await getTimelinesOf(country);
      res.set('Cache-Control', 'public, max-age=300').send({ countryTimelines });
    });

    app.post('/timeline/update/:type', async (req, res, next) => {
      const { newTimeline } = req.body;
      if (req.params.type != 'all' && req.params.type != 'confirmed'
       && req.params.type != 'deaths' && req.params.type != 'recovered') {
         return res.status(422).send({ err: `${req.params.type} is not a valid type`})
       }

      const addTimeline = await postTimeline(newTimeline, req.params.type);
      res.send({ timeline: newTimeline })
    })
  }
  
  