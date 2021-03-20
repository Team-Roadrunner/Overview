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
    client.query(`SELECT productstyle.productid, json_agg(json_build_object('style_id', productstyle.id, 'name', productstyle.name,
      'original_price', productstyle.original_price, 'sale_price', productstyle.sale_price,
      'default?', productstyle."default?", 'photos', photos, 'skus', skus)) results FROM productstyle
      LEFT JOIN (SELECT skus.style_id, json_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size)) skus
      FROM skus GROUP BY skus.style_id ) skus ON skus.style_id = productstyle.id
      LEFT JOIN (SELECT photos.style_id, json_agg(json_build_object('thumbnail_url' , photos.url, 'url', photos.thumbnail_url))
      photos FROM photos GROUP BY photos.style_id) photos ON photos.style_id = productstyle.id
      WHERE productstyle.productid = ${req.params.product_id} GROUP BY productstyle.productid`, (err, results) => {
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

