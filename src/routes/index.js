import express from 'express'
const router = express.Router();
import { body,  param, query, validationResult  } from 'express-validator';
import ProductController from '../controllers/product.controller.js'

// Landing page route
router.get('/', ProductController.getAllProducts)

// get all products
router.get('/products', ProductController.getAllProducts);

// get product detail  
router.get('/products/:productId', [
    param('productId').isMongoId().withMessage('Valid product ID is required')
], ProductController.getProductById);



router.post('/products/',
      /*
    #swagger.summary = 'Create a new user'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ProductCreate" }
        }
      }
    }
  */
    [
  body('productName').notEmpty().withMessage('Product Name is required'),
  body('price').isNumeric().withMessage('Price is required'),
  body('description').notEmpty(),
  body('category').notEmpty().withMessage('Category name is required'),
  body('subCategory').optional(),
  body('ownerName').notEmpty().withMessage('Owner name is required'),
  body('ownerEmail').optional().isEmail().withMessage('Valid email is required'),
  body('ownerName').notEmpty(),
  body('isActive').optional().isBoolean()
],ProductController.createProduct);

 
router.put('/products/:productId', [
  body('productName').notEmpty().withMessage('Product Name is required'),
  body('price').isNumeric().withMessage('Price is required'),
  body('description').notEmpty(),
  body('category').notEmpty().withMessage('Category name is required'),
  body('subCategory').optional(),
  body('ownerName').notEmpty().withMessage('Owner name is required'),
  body('ownerEmail').optional().isEmail().withMessage('Valid email is required'),
  body('ownerName').notEmpty(),
  body('isActive').optional().isBoolean()
],

 /*
    #swagger.summary = 'Update an existing product '
  
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ProductUpdate" }
        }
      }
    }
  */

ProductController.updateProduct);

// delete contact data
router.delete('/products/:productId', [
    param('productId').isMongoId().withMessage('Valid product ID is required')
], ProductController.deleteProduct);


export default router