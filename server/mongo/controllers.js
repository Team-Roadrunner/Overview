const dbMongo = require('../../database/dbMongo.js');

const controllers = {
  getAll: (req, res) => {
    dbMongo.getAll(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },
  getProduct: (req, res) => {
    dbMongo.getProduct(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },
  getStyle: (req, res) => {
    dbMongo.getStyle(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results[0]);
      }
    });
  },
  getRelated: (req, res) => {
    dbMongo.getRelated(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const newResults = [];
        results[0].related.forEach((item) => newResults.push(Number(item)));
        res.status(200).send(newResults);
      }
    });
  },
};

module.exports = controllers;
