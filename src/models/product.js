import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    productName : {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    description: {
          type: String,
          trim: true,
          required: [true, 'Category name is required'],
    },
    price: { 
        type: Number,
        required: [true, 'Price is required'],
        trim: true,
    },

    ownerName: {
          type: String,
          trim: true,
    },
    ownerEmail:{
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    ownerPhone: {
          type: String,
    },
     category: {
         type: String,
    },

    subCategory:{
         
    },
    isActive : {
        type: Boolean,
        default: true,
    }
   
    
}, {timestamps : true});



const Product = mongoose.model('Product', productSchema);

export default Product;