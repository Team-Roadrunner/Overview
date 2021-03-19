/* eslint-disable max-len */
const LineInputStream = require('line-by-line');
const path = require('path');
const mongoose = require('mongoose');
const { productStyles, styles } = require('./index.js');

const stream = new LineInputStream(path.join(__dirname, '../../styles.csv'));

// stream.setDelimiter('\n');

mongoose.connection.on('open', (err, conn) => {
  // lower level method, needs connection
  let bulk = styles.collection.initializeOrderedBulkOp();
  let counter = 0;

  stream.on('error', (err) => {
    console.log(err); // or otherwise deal with it
  });

  stream.on('line', (line) => {
    const row = line.split(','); // split the lines on delimiter
    // eslint-disable-next-line new-cap
    const obj = new productStyles({
      style_id: row[0],
      name: row[2],
      sale_price: row[3],
      original_price: row[4],
      default: row[5],
      photos: [],
      skus: {},
    });

    bulk.find({ product_id: Number(row[1]) }).upsert().update({ $push: { results: obj } }); // Bulk is okay if you don't need schema
    // defaults. Or can just set them.

    counter++;

    if (counter % 1000 == 0) {
      stream.pause();
      bulk.execute((err, result) => {
        if (err) throw err;
        // possibly do something with result
        bulk = styles.collection.initializeOrderedBulkOp();
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
