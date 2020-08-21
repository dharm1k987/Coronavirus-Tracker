const mongoose = require('../config/externals.js').mongoose;
const Schema = mongoose.Schema;

const StatSchema = new Schema({
  country: Schema.Types.String,
  totalCases: Schema.Types.Number,
  newCases: Schema.Types.Number,
  totalDeaths: Schema.Types.Number,
  newDeaths: Schema.Types.Number,
  activeCases: Schema.Types.Number,
  totalRecovered: Schema.Types.Number,
  seriousAndCritical: Schema.Types.Number,
});

module.exports = mongoose.model('Stat', StatSchema);

