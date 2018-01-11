export default {
  list(req, res, next) {
    res.status(200).json({message: 'You did GET a collection from gamma1'});
  },
  find(req, res, next) {
    res.status(200).json({message: "you did GET a single document from gamma1"});
  },
  create(req, res, next) {
    res.status(200).json({message: "you did POST a single document from gamma1"});
  },
  update(req, res, next) {
    res.status(200).json({message: "you did PUT/PATCH a single document from gamma1"});
  },
  delete(req, res, next) {
    res.status(200).json({message: "you did DELETE a single document from gamma1"});
  }
}