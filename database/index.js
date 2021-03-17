const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/overview', { useNewUrlParser: true });

let productsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  deafult_price: String,
  features: [
    {
      feature: String,
      value: String,
    }
  ],
});

let products = mongoose.model('Products', productsSchema);

let productStylesSchema = new mongoose.Schema({
  product_id: Number,
  results: [
    {
      style_id: Number,
      name: String,
      original_price: String,
      default: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String,
        }
      ],
      skus: {
        id: {
          quantity: Number,
          size: String,
        }
      }
    }
  ]
});

let productStyles = mongoose.model('ProductStyles', productStylesSchema);

let relatedProductsSchema = new mongoose.Schema({
  product_id: Number,
  id: Number,
});

let relatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);

module.exports = {
  products,
  productStyles,
  relatedProducts
}
