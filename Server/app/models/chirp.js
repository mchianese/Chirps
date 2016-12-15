var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var chirpSchema = new Schema({
  chirp: { type: String, required: true },
  chirpAuthor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: { type: Date, required: true, default: Date.now },
  likes: { type: Number, default: 0},
  reChirp: { type: Boolean, default: false }
});




var chirp = Mongoose.model('Chirp', chirpSchema);

//module.exports = {
 //   Chirp: chirp
//};

module.exports = Mongoose.model('Chirp', chirpSchema);

