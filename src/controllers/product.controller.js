import ProductService from '../services/product.service.js'
import { sendSuccess, sendError } from '../utils/responseMessage.js';
import { validationResult } from 'express-validator';

class ProductController {
  constructor() {
    //
  }

    static async getAllProducts(req, res, next) { 

        try {
            const result = await ProductService.getAllProducts()
            sendSuccess(res, result, 'Product successfully retrieved');
        } catch (error) {
            sendError(res, error.message || 'Failed to all Products', error.statusCode || 500);
            next(error);
        }
    } 
    
    static async createProduct(req, res, next){

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return sendError(res, 'Validation error', 400, errors.array());
        }
        
        try{
           const data = req.body;
           const result = await ProductService.createProduct(data);
           sendSuccess(res, result, 'New Product created successfully')
        }catch(error){
            sendError(res, error.message || 'Failed to product', error.statusCode || 500);
            next(error);
        }
    }

      static async getProductById(req, res, next){
        try{
        const productId = req.params.productId
           const result = await ProductService.getProductById(productId);
           sendSuccess(res, result, 'The operation was successful');
        }catch(error){
            sendError(res, error.message || 'Failed to retrieve a product', error.statusCode || 500);
            next(error);
        }
    }

  
    static async updateProduct(req, res, next){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return sendError(res, 'Validation error', 400, errors.array());
        }

        try{
            const productId = req.params.productId;
            const data = req.body;
           const result = await ProductService.updateProduct(productId, data);
           sendSuccess(res, result, 'The product successfully updated');
          }catch(error){
            sendError(res, error.message || 'Failed to update product', error.statusCode || 500);
            next(error);
        }
    }

    static async deleteProduct(req, res, next){
        try{
            const productId = req.params.productId;
           const result = await ProductService.deleteProduct(productId);
           sendSuccess(res, result, 'Product deleted successfully');
        }catch(error){
            sendError(res, error.message || 'Failed to delete product', error.statusCode || 500);
            next(error);
        }
    }

 
}

export default ProductController;