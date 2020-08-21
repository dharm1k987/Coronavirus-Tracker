const liveStats = require('./live-stats');
const timeline = require('./timeline');
const feedback = require('./feedback');

module.exports = {
  ...liveStats,
  ...timeline,
  ...feedback
};
