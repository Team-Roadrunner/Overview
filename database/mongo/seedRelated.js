const LineInputStream = require('line-by-line');
const path = require('path');
const mongoose = require('mongoose');
const { relatedProducts } = require('./index.js');

const stream = new LineInputStream(path.join(__dirname, '../../product.csv'));

// stream.setDelimiter('\n');

mongoose.connection.on('open', (err, conn) => {
  // lower level method, needs connection
  let bulk = relatedProducts.collection.initializeOrderedBulkOp();
  let counter = 0;

  stream.on('error', (err) => {
    console.log(err); // or otherwise deal with it
  });

  stream.on('line', (line) => {
    const row = line.split(','); // split the lines on delimiter
    // eslint-disable-next-line new-cap
    const obj = new relatedProducts({
      id: row[0],
      current_product_id: row[1],
      related_product_id: row[2],
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
        bulk = relatedProducts.collection.initializeOrderedBulkOp();
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
