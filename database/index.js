const { Client } = require('pg');
// const mongoose = require('mongoose');
const pgdb = require('../db.js');

const client = new Client(pgdb);

client.connect();

client.query('SELECT 1+1 AS solution', (err, results) => {
  if (err) throw err;
  console.log('The solution is: ', results.rows[0].solution);
});

// mongoose.connect('mongodb://localhost/productOverview', { useNewUrlParser: true, useUnifiedTopology: true });
// const mg = mongoose.connection;
// mg.once('open', () => {
//   console.log('mongoose connected');
// });

module.exports = { client };
