// const fs = require('fs');
// const LineInputStream = require('byline');

const LineInputStream = require('line-by-line');
const path = require('path');
const mongoose = require('mongoose');
const products = require('./index.js');

// var stream = fs.createReadStream('csv file');
// stream = byline.createStream(stream);
const stream = new LineInputStream(path.join(__dirname, '../../product.csv'));

stream.setDelimiter(',');

mongoose.connection.on('open', (err, conn) => {
  // lower level method, needs connection
  let bulk = products.collection.initializeOrderedBulkOp();
  let counter = 0;

  stream.on('error', (err) => {
    console.log(err); // or otherwise deal with it
  });

  stream.on('line', (line) => {
    // var row = line.toString('utf-8').split(",");
    const row = line.split(','); // split the lines on delimiter
    // eslint-disable-next-line new-cap
    const obj = new products({
      id: row[0],
      name: row[1],
      slogan: row[2],
      description: row[3],
      category: row[4],
      default_price: row[5],
      features: [],
    });
    // other manipulation

    bulk.insert(obj); // Bulk is okay if you don't need schema
    // defaults. Or can just set them.

    counter++;

    if (counter % 1000 == 0) {
      stream.pause();
      bulk.execute((err, result) => {
        if (err) throw err;
        // possibly do something with result
        bulk = products.collection.initializeOrderedBulkOp();
        stream.resume();
      });
    }
  });

  stream.on('end', () => {
    if (counter % 1000 != 0) {
      bulk.execute((err, result) => {
        if (err) throw err; // or something
      });
    }
    console.log('done');
  });
});
