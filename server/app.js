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
app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
