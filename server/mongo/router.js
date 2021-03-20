const router = require('express').Router();
const controllers = require('./controllers.js');

router
  .route('/products')
  .get(controllers.getAll);

router
  .route('/products/:id')
  .get(controllers.getProduct);

router
  .route('/products/:product_id/styles')
  .get(controllers.getStyle);

router
  .route('/products/:product_id/related')
  .get(controllers.getRelated);

module.exports = router;
