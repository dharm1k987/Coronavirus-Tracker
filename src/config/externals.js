const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(dbUrl);

module.exports.mongoose = mongoose;
