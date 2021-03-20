/* eslint-disable max-len */
const dbHelpers = require('../database/dbHelpers.js');

const controllers = {
  getAll: (req, res) => {
    dbHelpers.getAll(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results.rows);
      }
    });
  },
  getProduct: (req, res) => {
    dbHelpers.getProduct(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results.rows[0]);
      }
    });
  },
  getStyle: (req, res) => {
    dbHelpers.getStyle(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const newResults = {
          product_id: req.params.product_id,
          results: results.rows,
        };
        res.status(200).send(newResults);
      }
    });
  },
  getRelated: (req, res) => {
    dbHelpers.getRelated(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const newResults = [];
        results.rows.map((item) => newResults.push(item.related_product_id));
        res.status(200).send(newResults);
      }
    });
  },
};

module.exports = controllers;
