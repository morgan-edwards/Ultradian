//promises are a way to manage callbacks
//promises is an object with methods that notify whether a value is resolved
//or errored along the way.

//Here's an example using callbacks
const action = function(cb) => {
  setTimeout(function() {
    cb('hey');
  }, 5000);
};

action(function(arg) {
  console.log(arg);
});

//Now we refactor to use a promise
const actionPromise = function() => {
  return new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve('hey'); //or reject(new Error('ERROR!!!'));
    }, 5000);
  })
};

const promise = actionPromise()
  .then(function(word) { //of .catch if it was rejected
    console.log(word);
  }).catch(function(err) {
    console.log(err);
  });

//Now an expample with reading files
const fs = require('fs');
//with ol' callbacks
fs.readFile('./fileName', function(err, file) {
  console.log(file.toString);
})

//with a promise
const readFileProm = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile('./fileName', function(err, file) { //this is node syle (err, thingYouWant)
      return err ? reject(err) : resolve(file.toString());
    });
  });
}

readFileProm()
  .then((file) => console.log(file))
  .catch((err) => console.log(err))
  .finally(() => console.log('I run no matter what!'));

//Anything returned in a .then() is wrapped in another promise
//whatever is returned in the prev .then() feeds to the next
//any errors jump the chain to .catch()

const logFile = function() {
  return readFile()
    .then(function() {
      return readFile()
    });
};

readFile()
.then(logFile) //the promise chain in logFile will run in full before moving to sendEmail
.then(sendEmail)
.catch(function(err) {
  console.log(err);
});

//Helpful method that runs an array of promises an wait until they are all done before
//moving on, allowing to do things in parallel and then comeback when they're all done.
//Promises can't depend on one another
const promises = [readFileProm(), readFileProm(), readFileProm()];

const readAllFiles = function() {
  return Promise.all(promises);
};

readAllFiles()
  .then(function(files) {
    console.log(files); //an array of all the files
  });
