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

router
  .route('loaderio-32b08299a276c01002d85ed45eac0cc3', (req, res) => {
    res.send('loaderio-32b08299a276c01002d85ed45eac0cc3');
  });

module.exports = router;
