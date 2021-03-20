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
    client.query(`SELECT * FROM productInfo WHERE id <= ${count}`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  // adjust the result to be structured the way you want.
  getProduct: (req, callback) => {
    client.query(`SELECT productinfo.*, jsonb_agg(jsonb_build_object('value', features.value, 'feature', features.feature)) AS features FROM productinfo RIGHT JOIN features ON features.product_id = productinfo.id WHERE productinfo.id = ${req.params.id} GROUP BY productinfo.id`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  getStyle: (req, callback) => {
    client.query(`SELECT productstyle.*, jsonb_agg(jsonb_build_object('thumbnail' , photos.url, 'url', photos.thumbnail_url)) AS photos,
    json_object_agg(skus.id, json_build_object('quantity', skus.size, 'size', skus.quantity)) AS skus
    FROM productstyle
    INNER JOIN skus ON skus.style_id = productstyle.id
    INNER JOIN photos ON photos.style_id = productstyle.id
    WHERE productstyle.productid = ${req.params.product_id} GROUP BY productstyle.id`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  getRelated: (req, callback) => {
    client.query(`SELECT related_product_id FROM related WHERE current_product_id=${req.params.product_id}`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
};

module.exports = dbHelpers;
