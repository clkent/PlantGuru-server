const idValidator = (req, res, next) => {
  let id;
  if (req.params.id) {
    id = req.params.id;
    if (req.user.id !== id) {
      let err = new Error('Invalid id');
      err.status = 400;
      next(err);
    }
  }
  return next();
};

const requiredFieldsInBody = args => (req, res, next) => {
  for (let o of args) {
    if (!(o in req.body)) {
      let err = new Error(`Missing field: ${o}`);
      err.status = 400;
      next(err);
    }
  }
  return next();
};

module.exports = {
  requiredFieldsInBody,
  idValidator
};
