import mongoose from 'mongoose';
import { productSchema } from './product.js';
import { cartSchema } from './cart.js';


export const orderSchema = mongoose.Schema({
     carts: [cartSchema],
     status: { type: String, default: 'Pending'}
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;