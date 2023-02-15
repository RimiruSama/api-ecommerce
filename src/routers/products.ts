import express from 'express';

const router = express.Router();

const {
    getListProduct,
    createProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct,
    getCountProduct,
    getFeaturedProduct
} = require('../controller/productController');

router.get('/', getListProduct);

router.get('/:id', getSingleProduct);

router.post('/', createProduct);

router.put('/:id', updateSingleProduct);

router.delete('/:id', deleteProduct);

router.get('/get/count', getCountProduct);

router.get('/get/featured/:count', getFeaturedProduct)

module.exports = router;