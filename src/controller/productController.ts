import { Request, Response } from 'express';
import { IProduct } from '../interfaces/IProduct';
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const mongoose = require('mongoose');

const getListProduct = async (req: Request, res: Response) => {
    console.log('sdf')
    const categories = req.query.categories
    let filterParams = '';
    let filter = {};

    if(categories !== undefined && typeof categories == 'string') {
        filterParams = categories;
        console.log(filterParams.split(','))
        filter = {category: filterParams.split(',')}
    }

    const productList = await Product.find(filter).populate('category');

    if (!productList) {
        res.status(500).json({ success: false })
    }

    res.status(200).send(productList)
}

const getSingleProduct = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(product);
}

const createProduct = async (req: Request, res: Response) => {
    const {
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured
    } = req.body;

    const categoryCheck = await Category.findById(category);
    if (!categoryCheck) return res.status(400).send('Invalid Category')

    let product = new Product({
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured
    });

    product = await product.save();

    if (!product) return res.status(500).send('The product cannot be created!');

    res.status(200).send(product)
}

const updateSingleProduct = async (req: Request, res: Response) => {
    if(mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product Id')
    }

    const {
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured
    } = req.body;
    

    const categoryCheck = await Category.findById(category);
    if (!categoryCheck) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            richDescription,
            image,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured
        },
        { new: true }
    )

    if (!product)
        return res.status(500).send('The product cannot be updated!')

    res.status(200).send(category)
}

const deleteProduct = async (req: Request, res: Response) => {
    Product.findByIdAndRemove(req.params.id).then((product: IProduct) => {
        if(product) {
            return res.status(200).json({success: true, message: 'The product deleted successfully!'})
        } else {
            return res.status(404).json({success: false, message: 'The product cannot be delete'})
        }
    }).catch((err: Error) => {
        return res.status(500).json({success: false, error: err})
    })
}

const getCountProduct = async (req: Request, res: Response) => {
    const productCount = await Product.countDocuments();

    if(productCount) {
        res.status(500).json({success: false})
    }

    res.send({
        productCount: productCount
    });
}

const getFeaturedProduct = async (req: Request, res: Response) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({isFeatured: true}).limit(count);

    if(!products) {
        res.status(500).json({success: false});
    }

    res.send(products);
}

module.exports = {
    getListProduct,
    createProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct,
    getCountProduct,
    getFeaturedProduct
}