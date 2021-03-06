module.exports = {
  list(req, res, next) {
    res.status(200).json({ message: 'You did GET a collection from beta' });
  },
  find(req, res, next) {
    res.status(200).json({ message: 'You did GET a single document from beta' });
  },
  createOne(req, res, next) {
    res.status(200).json({ message: 'You did POST a single document from beta' });
  },
  updateOne(req, res, next) {
    res.status(200).json({ message: 'You did PUT/PATCH a single document from beta' });
  },
  deleteOne(req, res, next) {
    res.status(200).json({ message: 'You did DELETE a single document from beta' });
  }
}