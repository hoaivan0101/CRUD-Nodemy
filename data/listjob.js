const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Users = new Schema({
  title: String,
  username: String,
}, {
  collection: 'todojobs',
});

const Accouts = mongoose.model('todojobs', Users);
module.exports = Accouts;
