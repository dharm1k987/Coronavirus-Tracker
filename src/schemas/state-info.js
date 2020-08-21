const mongoose = require('../config/externals.js').mongoose;
const Schema = mongoose.Schema;

const StateInfoSchema = new Schema({
  country: Schema.Types.String,
  state: Schema.Types.String,
  activeCases: Schema.Types.Number,
  totalRecovered: Schema.Types.Number,
  totalDeaths: Schema.Types.Number,
});

module.exports = mongoose.model('StateInfo', StateInfoSchema);

