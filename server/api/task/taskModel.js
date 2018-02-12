const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: String,
  startDate: Date,
  dueDate: Date,
  weeklyQuota: Number,
  dailyQuota: Number,
  importance: Number,
  user: {
    type: Schema.Types.ObjectId, //leave mongoose off because aliased above
    ref: 'user',
    required: true
  },
  categories: {
    type: [{type: Schema.Types.ObjectId, ref: 'category'}] //an array of category types
  }
});

module.exports = mongoose.model('task', TaskSchema);
