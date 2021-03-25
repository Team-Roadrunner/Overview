/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const newrelic = require('newrelic');
const router = require('./routes.js');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use('/loaderio-98273f7148e4f0fffd07151fbbb2e462', (req, res) => {
  res.send('loaderio-98273f7148e4f0fffd07151fbbb2e462');
});

app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
