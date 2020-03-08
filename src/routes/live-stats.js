const {
  getStats,
  postStats
} = require('../models');

module.exports = app => {
  app.get('/live-stats', async (req, res, next) => {
    const stats = await getStats();
    res.send({
      message: "Hello world! We are live!",
      ...stats
    });
  });

  app.post('/live-stats/update', async (req, res, next) => {
    const { newStats } = req.body;
    const addStats = await postStats(newStats);
    res.send({ stats: newStats });
  });
}

