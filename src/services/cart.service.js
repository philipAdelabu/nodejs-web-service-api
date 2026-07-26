import Product from '../models/product.js';
import Order from '../models/order.js';
import User from '../models/user.js';
import UserService from './user.service.js';
import ProductService from './product.service.js';
import Cart from '../models/cart.js';


class CartService {
    constructor(){

    }

   static async updateCart(userId, productId){
         try{
            const product = await ProductService.findById(productId);
            const user = await User.findById(userId);
            const cart = user.cart;
            let found = false;
          
            const pc = cart.products.find((prd) => {
                 if(prd._id === productId){
                     cart.totalAmount  += prd.price;
                     cart.totalQuantiy += 1; 
                     found = true;
                     return;
                   } 
              });
            if(!found){
             cart.products.push(product);
             cart.totalAmount += product.price;
           
            }

             user.cart = cart;
             user.save();
             return user;
            }catch(error){
         throw result;
       }
   }



    static async newToOrder(userId, productId){
       try{
             const price = await this.getProductPrice(productId);
             const result = await Order.updateOne(
                         { userId: userId, "items.productId": { $ne: productId }, totalAmount: price },
                        { $push: { items: { productId, quantity: 1 } } },
                        { $inc: { "items.$.quantity": 1 } },
                        { $set: { totalAmount: price } }
                      );
              return result;
            }catch(error){
         throw result;
       }
    }

    
    static async updateOrder(orderId, productId ){
       try{
             const result = await Order.updateOne(
                       { _id: orderId },
                       { $push: { items: productId } }, 
                       {new: true}
                      );
              return result;
            }catch(error){
             throw result;
        }
     }

    static async removeProductFromOrder(orderId, productId){
          try{
             const result = await Order.updateOne(
                       { _id: orderId },
                       { $pull: { items: productId } }, {new: true}
                      );
              return result;
            }catch(error){
         throw result;
       }
    }

    static async findCartByUserId(userId){
        try{
            const user = await UserService.findUserById(userId);
            const cart = await Cart.find({user: user});
            return cart;
        }catch(error){
            throw error;
        }
    }

    static async getProductPrice(productId){
        try{
           const prc = await Product.find({_id: productId});
            return prc.price;
        }catch(error){
          throw error;
        }
    }
}