const {
  Feedback
} = require('../schemas');

const addFeedback = async (message) => {
  const addedFeedback = await Feedback.create({ message });
}

module.exports = {
  addFeedback
};
