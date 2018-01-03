module.exports = {
  list(req, res, next) {
    res.json({ message: 'You did GET a collection from alpha' });
  },
  find(req, res, next) {
    res.json({ message: 'You did GET a single document from alpha' });
  },
  create(req, res, next) {
    res.json({ message: 'You did POST a single document from alpha' });
  },
  update(req, res, next) {
    res.json({ message: 'You did PUT/PATCH a single document from alpha' });
  },
  delete(req, res, next) {
    res.json({ message: 'You did DELETE a single document from alpha' });
  }
}