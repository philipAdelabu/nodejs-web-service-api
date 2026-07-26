import mongoose from 'mongoose';
import { productSchema } from './product.js';


export const cartSchema = mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, unique: true},
 products: [{productSchema}],
 totalQuatity: {type: Number},
 totalAmount: { type: Number, default: 0 },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;