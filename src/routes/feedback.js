const {
  addFeedback
} = require('../models');

module.exports = app => {
  app.post('/feedback', async (req, res, next) => {
    const { feedbackMsg } = req.body;
    if (feedbackMsg.length === 0) return res.send({ newFeedback });
    const newFeedback = await addFeedback(feedbackMsg);
    return res.send({ newFeedback });
  });
}

