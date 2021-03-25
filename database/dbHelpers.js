const { client } = require('./index.js');

const dbHelpers = {
  getAll: (req, callback) => {
    let { page } = req.query;
    let { count } = req.query;
    if (page === undefined) {
      page = 1;
    }
    if (count === undefined) {
      count = 5;
    }
    client.query(`SELECT * FROM productInfo LIMIT ${count} OFFSET ${(page - 1) * 20}`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  // adjust the result to be structured the way you want.
  getProduct: (req, callback) => {
    client.query(`SELECT productinfo.*, json_agg(json_build_object('feature', features.feature, 'value', features.value)) AS features FROM productinfo RIGHT JOIN features ON features.product_id = productinfo.id WHERE productinfo.id = ${req.params.id} GROUP BY productinfo.id`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  getStyle: (req, callback) => {
    client.query(`SELECT * FROM fullstyle WHERE fullstyle.productid = ${req.params.product_id}`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  getRelated: (req, callback) => {
    client.query(`SELECT * FROM relatedid WHERE id=${req.params.product_id}`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
};

module.exports = dbHelpers;
