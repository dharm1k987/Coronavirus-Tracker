const mongoose = require('../config/externals.js').mongoose;
const Schema = mongoose.Schema;

const ParamSchema = new Schema({
  date: Schema.Types.String,
  value: Schema.Types.Number
})
const TimelineSchema = new Schema({
  country: Schema.Types.String,
  data: [ParamSchema],
  type: Schema.Types.String

});

module.exports = mongoose.model('Timeline', TimelineSchema);

