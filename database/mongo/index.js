/* eslint-disable no-plusplus */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/productOverview', { useNewUrlParser: true, useUnifiedTopology: true });

const styles = mongoose.model('styles', new mongoose.Schema({ product_id: Number }, { versionKey: false }));

// for (let i = 940002; i <= 940001; i++) {
//   styles.create({ product_id: i });
// }

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
  style_id: Number,
  name: String,
  sale_price: String,
  original_price: String,
  default: Boolean,
  photos: Array,
  skus: Object,
});

productStylesSchema.index({ id: 1 });
const productStyles = mongoose.model('Styles', productStylesSchema);

const relatedProductsSchema = new mongoose.Schema({
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
  size: String,
  quantity: Number,
});

const skus = mongoose.model('Skus', skusSchema);

const photoSchema = new mongoose.Schema({
  url: String,
  thumbnail_url: String,
});

const photos = mongoose.model('Photos', photoSchema);

module.exports = {
  products, features, productStyles, photos, skus, relatedProducts, styles,
};
