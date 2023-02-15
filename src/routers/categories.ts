import express from 'express';

const router = express.Router();

const {
    getListCategory,
    createCategory,
    deleteCategory,
    getSingleCategory,
    updateSingleCategory
} = require('../controller/categoryController');

router.get('/', getListCategory);
router.get('/:id', getSingleCategory);
router.put('/:id', updateSingleCategory)
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

module.exports = router;