const client = require('./index.js');

const dbHelpers = {
  getAll: (callback) => {
    client.query('SELECT * FROM productInfo', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  // adjust the result to be structured the way you want.
  getProduct: (callback) => {
    client.query(`SELECT productinfo.*, jsonb_agg(jsonb_build_object('features', features.feature, 'values', features.value))
    FROM productinfo RIGHT JOIN features ON features.product_id = productinfo.id GROUP BY productinfo.id`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  getStyle: (callback) => {
    client.query('')
  },
  getRelated: (callback, req) => {
    client.query(`SELECT related_product_id FROM related WHERE ${req.params.id}`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
};

