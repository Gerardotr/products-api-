import {Schema } from 'mongoose';

export const ProductSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    imageUrl: String,
    price: String,
    createdAt: {
        type: String,
        default: Date.now
    }
});

