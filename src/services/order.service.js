import Product from '../models/product';
import Order from '../models/order';
import User from '../models/user';
import UserService from './user.service';
import ProductService from './product.service';
import Cart from '../models/cart';


class CartService {
    constructor(){

    }

   static async addToCart(userId, productId){
        
   }

   static async updateCart(userId, productId){

   }
  
   static async deleteCart(userId){
       try{
          const result = await Cart.findAndDelete({user: userId});
          return result;
       }catch(error){
        throw error;
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