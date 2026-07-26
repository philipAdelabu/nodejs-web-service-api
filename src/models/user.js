import { Timestamp } from 'mongodb';
import  mongoose  from 'mongoose';
import { cartSchema } from './cart.js';
import { orderSchema } from './order.js';
import { productSchema } from './product.js';
import { profileSchema } from './profile.js';


const userSchema = new mongoose.Schema({

     username: {
      type: String,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      unique: true,
      require: true,
      trim: true,
    },
   isActive:{
     type: Boolean,
     default: true,
   },
}, {timestamps: true}) 


 const User = mongoose.model('User', userSchema);

 export default User;