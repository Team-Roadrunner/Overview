/* eslint-disable max-len */
const LineInputStream = require('line-by-line');
const path = require('path');
const mongoose = require('mongoose');
const { products, features } = require('./schema.js');

const stream = new LineInputStream(path.join(__dirname, '../../features.csv'));

// stream.setDelimiter('\n');

mongoose.connection.on('open', (err, conn) => {
  // lower level method, needs connection
  let bulk = products.collection.initializeOrderedBulkOp();
  let counter = 0;

  stream.on('error', (err) => {
    console.log(err); // or otherwise deal with it
  });

  stream.on('line', (line) => {
    const row = line.split(','); // split the lines on delimiter
    // eslint-disable-next-line new-cap
    const obj = new features({
      id: row[0],
      productId: row[1],
      feature: row[2],
      value: row[3],
    });
    // other manipulation

    bulk.find({ id: Number(row[1]) }).updateOne({ $addToSet: { features: obj } });
    // bulk.find({ id: Number(row[1]) }).upsert().update({ $addToSet: { features: obj } });
    // Bulk is okay if you don't need schema
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
      // maybe look at result
      });
    }
    console.log('done');
  });
});
