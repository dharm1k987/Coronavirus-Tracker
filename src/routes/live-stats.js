const {
  getStats,
  postStats,
  getStatsOf
} = require('../models');

module.exports = app => {
  app.get('/live-stats', async (req, res, next) => {
    const stats = await getStats();
    res.set('Cache-Control', 'public, max-age=300').send({ stats: stats });
  });

  app.post('/live-stats/update', async (req, res, next) => {
    const { newStats } = req.body;
    const addStats = await postStats(newStats);
    res.send({ stats: newStats });
  });

  app.get('/live-stats/:country', async (req, res, next) => {
    const { country } = req.params;
    const countryStats = await getStatsOf(country);
    res.set('Cache-Control', 'public, max-age=300').send({ countryStats });
  });


}

