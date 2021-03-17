const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/overview', { useNewUrlParser: true });

let productInfoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
});

const product = mongoose.model('ProductId', productInfoSchema);

let productStyleSchema = new mongoose.Schema({
  id: Number,
  productId: String,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: String,
});

const productStyle = mongoose.model('ProductStyle', productStyleSchema);

let featuresSchema = new mongoose.Schema({
  productId: Number,
  fabric: String,
  Canvas: String,
});

const features = mongoose.model('Features', featuresSchema);

let skusSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number,
});

const skus = mongoose.model('Skus', skusSchema);

let photosSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  url: String,
  thumbnail_url: String,
});

const photos = mongoose.model('Photos', photosSchema);

let relatedProductSchema = new mongoose.Schema({
  id: Number,
  current_product_id: Number,
  related_product_id: Number,
});

const relatedProduct = mongoose.model('RelatedProduct', relatedProductSchema);
