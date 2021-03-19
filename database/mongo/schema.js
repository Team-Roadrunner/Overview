const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/productOverview', { useNewUrlParser: true, useUnifiedTopology: true });

let productsSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  name: String,
  slogan: String,
  description: String,
  category: String,
  deafult_price: String,
  features: Array,
});

productsSchema.index({ id: 1 });
let products = mongoose.model('Products', productsSchema);

let productStylesSchema = new mongoose.Schema({
  product_id: Number,
  results: [
    {
      id: { type: Number, index: true},
      name: String,
      sale_price: String,
      original_price: String,
      default: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String,
        },
      ],
      skus: {
        id: {
          quantity: String,
          size: String,
        },
      },
    },
  ],
});

productStylesSchema.index({ id: 1 });
let productStyles = mongoose.model('ProductStyles', productStylesSchema);

let relatedProductsSchema = new mongoose.Schema({
  product_id: Number,
  id: Number,
});

let relatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);

let featuresSchema = new mongoose.Schema({
  id: Number,
  productId: Number,
  feature: String,
  value: String,
});

let features = mongoose.model('Features', featuresSchema);

module.exports = { products, features, productStyles };
