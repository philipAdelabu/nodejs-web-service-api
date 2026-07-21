import Product from '../models/product.js';


class ProductService {
     constructor(){

     }

     static async createProduct(data = {}){
            if(!data){
                console.log("The data is empty");
                return null;
            }
        try{
            const result = await Product.create(data);
            return result;
        }catch(error){
            throw error;
        }
       }
    
    static async getProductById(productId){
        try{
            const result = await Product.findOne({_id: productId});
            return result;
        }catch(error){
            throw error;
        } 
    }

     static async getAllProducts(){
        try{
            const result = await Product.find();
            return result;
        }catch(error){
            throw error;
        }   
    }

    static async updateProduct(productId, data){
        try{
            const result = await Product.findOneAndUpdate({_id: productId}, data, {new: true});
            return result;
         }catch(error){
            throw error; 
        } 
    }

    static async deleteProduct(productId){
        try{
            const result = await Product.findOneAndDelete({_id: productId});
            if(!result){
                throw new Error("Product not found");
            }
            return result;
             }catch(error){
            throw error;
           } 
      }       
    
}

export default ProductService;