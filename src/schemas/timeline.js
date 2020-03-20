const mongoose = require('../config/externals.js').mongoose;
const Schema = mongoose.Schema;

const TimelineSchema = new Schema({
  country: Schema.Types.Object
});

module.exports = mongoose.model('Timeline', TimelineSchema);

