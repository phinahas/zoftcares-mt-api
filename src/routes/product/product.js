const express = require('express');

const productController = require('../../controllers/productController')

const router  = express.Router();

router.get('/get-all-products',productController.getAllProduct);
router.get('/get-a-product',productController.getAProduct);
router.get('/get-a-product-attributes',productController.getAProductAttributes);
router.post('/get-a-product-variant-by-attributes',productController.getAProductVariantByAttributes)



module.exports = router;