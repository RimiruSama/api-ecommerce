import { IUser } from './IUser';
import { IProduct } from './IProduct';
export interface IOrder {
    orderItems: string[] | IOrderItem[]
    shippingAddress1: string
    shippingAddress2?: string
    city: string
    zip: string
    country: string
    phone: string
    status: string
    totalPrice?: number
    user: string | IUser
    dateOrdered: string | Date
}

export interface IOrderItem {
    quantity: number
    product: string | IProduct
}