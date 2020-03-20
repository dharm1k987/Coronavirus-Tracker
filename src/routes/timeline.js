const {
    postTimeline,
  } = require('../models');
  
  module.exports = app => {

    app.post('/timeline/update', async (req, res, next) => {
      const { newTimeline } = req.body;
      const addTimeline = await postTimeline(newTimeline);
      res.send({ timeline: newTimeline })
    })
  }
  
  