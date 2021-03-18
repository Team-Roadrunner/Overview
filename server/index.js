const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const csv = require('fast-csv');
const express = require('express');
const fs = require('fs');
const path = require('path');
const products = require('../database/index.js');

const app = express();

const csvfile = path.join(__dirname, '/product.csv');
const stream = fs.createReadStream(csvfile);

let csvData = [];
let csvStream = csv().on('data', (data) => {
  csvData.push({
    id: data[0],
  });
}).on('end', () => console.log('end'));

stream.pipe(csvStream);
