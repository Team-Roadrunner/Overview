const { Client } = require('pg');
const pgdb = require('../db.js');

const client = new Client(pgdb);

client.connect();

client.query('SELECT 1+1 AS solution', (err, results) => {
  if (err) throw err;
  console.log('The solution is: ', results.rows[0].solution);
});

module.exports = client;
