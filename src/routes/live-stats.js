const {
  getStats,
  postStats,
  postStateStats,
  getStatsOf,
  getStateStatsByCountry
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

  app.post('/live-stats/states/update', async (req, res, next) => {
    const { statesStats } = req.body;
    const result = await postStateStats(statesStats);
    return res.send({ statesStats });
  });

  app.get('/live-stats/:country/states', async (req, res, next) => {
    let { country } = req.params;
    country = country.toUpperCase();
    const stateStats = await getStateStatsByCountry(country);
    return res.send({ stateStats });
  })

  app.get('/live-stats/:country', async (req, res, next) => {
    let { country } = req.params;
    country = country.toUpperCase();
    const countryStats = await getStatsOf(country);
    res.set('Cache-Control', 'public, max-age=300').send({ countryStats });
  });


}

