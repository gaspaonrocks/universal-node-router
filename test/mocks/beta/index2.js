module.exports = {
  list(req, res, next) {
    res.json({ message: 'You did GET a collection from beta' });
  },
  find(req, res, next) {
    res.json({ message: 'You did GET a single document from beta' });
  },
  create(req, res, next) {
    res.json({ message: 'You did POST a single document from beta' });
  },
  update(req, res, next) {
    res.json({ message: 'You did PUT/PATCH a single document from beta' });
  },
  delete(req, res, next) {
    res.json({ message: 'You did DELETE a single document from beta' });
  }
}