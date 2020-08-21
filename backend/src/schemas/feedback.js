const mongoose = require('../config/externals.js').mongoose;
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  message: Schema.Types.String,
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

