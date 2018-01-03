module.exports = {
  list(req, res, next) {
    res.json({ message: 'You did GET a collection from gamma1' });
  },
  find(req, res, next) {
    res.json({ message: "you did GET a single document from gamma1" });
    next();
  },
  create(req, res, next) {
    res.json({ message: "you did POST a single document from gamma1" });
    next();
  },
  update(req, res, next) {
    res.json({ message: "you did PUT/PATCH a single document from gamma1" });
    next();
  },
  delete(req, res, next) {
    res.json({ message: "you did DELETE a single document from gamma1" });
    next();
  }
}