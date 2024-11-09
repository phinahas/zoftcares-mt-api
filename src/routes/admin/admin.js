const express = require('express');

const adminController = require('../../controllers/adminController')

const router  = express.Router();


router.post('/create-category',adminController.createCategory);
router.post('/create-attribute',adminController.createAttribute);
router.get('/get-category-list',adminController.listCategory);
router.get('/get-attribute-list',adminController.listAttribute);
router.post('/create-a-variant-product',adminController.createVariantProduct);



module.exports = router;