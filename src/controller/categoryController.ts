import {Request, Response} from 'express';
import { ICategory } from '../interfaces/ICategory';

const {Category} = require('../models/category');

const getListCategory = async (req: Request, res: Response) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList);
}

const getSingleCategory = async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found!'})
    }

    res.status(200).send(category);
}

const updateSingleCategory = async (req: Request, res: Response) => {
    const {name, icon, color} = req.body
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name, icon, color
        },
        {new: true}
    )

    if(!category) return res.status(400).send('The category cannot be updated!');

    res.status(200).send(category);
}

const createCategory = async (req: Request, res: Response) => {
    const {name, icon, color}= req.body;

    let category = new Category({
        name, icon, color
    });
    category = await category.save();

    if(!category) {
        res.status(404).send('The category cannot be created!');
    }

    res.send(category);
}

const deleteCategory = async (req: Request, res: Response) => {
    Category.findByIdAndRemove(req.params.id).then((category: ICategory) => {
        if(category) {
            return res.status(200).json({
                success: true,
                message: 'The category is deleted!s'
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'category not found!'
            })
        }
    }).catch((err: Error) => {
        return res.status(400).json({
            success: false,
            message: err
        })
    }) 
}

module.exports = {
    getListCategory,
    createCategory,
    deleteCategory,
    getSingleCategory,
    updateSingleCategory
}