import { ICategory } from '../interfaces/ICategory';
import mongoose, { Schema, model } from 'mongoose';

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    color: {
        type: String
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});

exports.Category = model<ICategory>('Category', categorySchema);