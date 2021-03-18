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
    client.query('SELECT productinfo.*, features.feature, features.value FROM productinfo RIGHT JOIN features ON features.product_id = productinfo.id', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
};
