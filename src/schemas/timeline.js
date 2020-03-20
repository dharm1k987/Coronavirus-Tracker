const mongoose = require('../config/externals.js').mongoose;
const Schema = mongoose.Schema;

const TimelineSchema = new Schema({
  country: Schema.Types.String,
  data: Schema.Types.Object,
  type: Schema.Types.String

});

module.exports = mongoose.model('Timeline', TimelineSchema);

