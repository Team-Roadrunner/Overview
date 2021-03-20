/* eslint-disable max-len */
const { mg } = require('./index.js');

const products = mg.collection('products');
const styles = mg.collection('styles');

const dbMongo = {
  getAll: (req, callback) => {
    // add default_price
    let { page } = req.query;
    let { count } = req.query;
    if (page === undefined) {
      page = 1;
    }
    if (count === undefined) {
      count = 5;
    }
    products.find({ id: { $gt: 0, $lt: Number(count) + 1 } }).project({
      _id: 0, id: 1, name: 1, slogan: 1, description: 1, category: 1,
    }).toArray((err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  getProduct: (req, callback) => {
    products.find({ id: Number(req.params.id) }).project({
      _id: 0, id: 1, name: 1, slogan: 1, description: 1, category: 1, features: 1,
    }).toArray((err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  getStyle: (req, callback) => {
    styles.find({ results: { $elemMatch: { style_id: Number(req.params.product_id) } } }).project({ related: 0, _id: 0 }).toArray((err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  getRelated: (req, callback) => {
    products.find({ id: Number(req.params.product_id) }).project({ related: 1, _id: 0 }).toArray((err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
};

module.exports = dbMongo;
