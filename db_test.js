const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks');

//first step is to make a new schema, the blueprint for the object stored
const TaskSchema = new mongoose.Schema({
  //define properties and datatypes
  name: String,
  time: Number,
  completed: Boolean,
  //add validations with object literals
  body: {type: Text, required: true}
});
//here's a bunch of examples
const SampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  dueDate: Date,
  inProgress: Boolean,
  referenceCode: Buffer, //data that hasn't been converted to readable text
  value: {
    type: Number,
    min: 0,
    max: 100
  },
  items: [], //this allows madness, but you can set this strictly like everything else
  //nested objects work as well because theres not mongoose keywords until lowest level
  location: {
    city: String,
    state: String,
    country: String
  },
  //Relationships are doable
  owner: {
    type: mongoose.Schema.Types.ObjectId, //This gets treated like a string the the ORM API, IDs are indexed by default
    ref: 'owner',
    required: true
  }
});

//Then we register the schema with the mongoose, it returns a model to use throughout app
const Task = mongoose.model('task', TaskSchema); //this is a getter and setter -- 2nd argument creates new model
//first argument will get lowercased and pluralized
//second argument is the schema
Task.create({
  name: 'learn spanish',
  time: 500,
  completed: false
});

//Here's the basic query syntax
Task.find({title: 'whatever'}, function(err, docs) {
  const documents = docs;
});

//To create documents
const thing = new Task({
  name: 'name',
  time: 69,
  completed: true
});

thing.save(function(err, savedTask) {
  if (err) {
    next(err);
  } else {
    res.json(savedTask);
  }
});

//or combine both steps
Task.create({
  name: 'name',
  time: 69,
  completed: true
}, function(err, savedTask) {CB logic...});

//To update a document
Task.findByIdAndUpdate('696969420', {name: 'new name'}, function(err, updatedDoc) { logic });
//this will replace the entire object with whatever is passed in
