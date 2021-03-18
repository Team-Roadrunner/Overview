const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const PORT = 3000;

const router = require('./routes.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());

