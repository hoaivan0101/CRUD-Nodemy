const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Users = new Schema({
  username: String,
  password: String,
  role: String,
}, {
  collection: 'Lists',
});

const Accouts = mongoose.model('Lists', Users);
module.exports = Accouts;
