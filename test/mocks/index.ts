export default {
  listAll(req, res, next) {
    res.status(200).json({ message: 'You did GET a collection from index' });
  },
  findOne(req, res, next) {
    res.status(200).json({ message: 'You did GET a single document from index' });
  },
  create(req, res, next) {
    res.status(200).json({ message: 'You did POST a single document from index' });
  },
  update(req, res, next) {
    res.status(200).json({ message: 'You did PUT/PATCH a single document from index' });
  },
  delete(req, res, next) {
    res.status(200).json({ message: 'You did DELETE a single document from index' });
  }
}