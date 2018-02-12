const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  focusTime: Number,
  restTime: Number,
  lunchTime: Number,
});

module.exports = mongoose.model('user', UserSchema);
