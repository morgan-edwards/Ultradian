module.exports = () => {
  return function(err, req, res, next) {
    console.log(err.message);
    res.status(500).send(err.stack);//returns stack trace of error
  };
};
