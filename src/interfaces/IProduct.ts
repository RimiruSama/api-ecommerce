import { Date } from "mongoose"

export interface IProduct {
    name: string
    description: string
    richDescription: string
    image: string
    images: string[]
    brand: string
    price: number
    category: any
    countInStock: number
    rating: number
    numReviews: number,
    isFeatured: boolean,
    dateCreated: Date
}