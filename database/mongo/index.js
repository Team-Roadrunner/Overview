const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/productOverview', { useNewUrlParser: true, useUnifiedTopology: true });

const productsSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  name: String,
  slogan: String,
  description: String,
  category: String,
  deafult_price: String,
  features: Array,
});

productsSchema.index({ id: 1 });
const products = mongoose.model('Products', productsSchema);

const productStylesSchema = new mongoose.Schema({
  product_id: Number,
  results: [
    {
      style_id: { type: Number, index: true },
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
const styles = mongoose.model('Styles', productStylesSchema);

const relatedProductsSchema = new mongoose.Schema({
  id: Number,
  current_product_id: Number,
  related_product_id: Number,
});

const relatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);

const featuresSchema = new mongoose.Schema({
  id: Number,
  productId: Number,
  feature: String,
  value: String,
});

const features = mongoose.model('Features', featuresSchema);

const skusSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number,
});

const skus = mongoose.model('Skus', skusSchema);

const photoSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  url: String,
  thumbail_url: String,
});

const photos = mongoose.model('Photos', photoSchema);

module.exports = {
  products, features, styles, photos, skus, relatedProducts,
};
