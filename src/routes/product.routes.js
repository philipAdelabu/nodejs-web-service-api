import express from 'express'
const router = express.Router();
import { body,  param, query, validationResult  } from 'express-validator';
import ProductController from '../controllers/product.controller.js'
import ensureAuthenticated from '../middleware/ensureAthenticated.js'; 



// Landing page route
router.get('/all',     /*
          #swagger.summary = 'Get all products'
      */ ProductController.getAllProducts)

// get product detail  
router.get('/product/:productId',
         /*
          #swagger.summary = 'Get product by id'
      */ [
    param('productId').isMongoId().withMessage('Valid product ID is required')
], ProductController.getProductById);


router.post('/product',
      /*
    #swagger.summary = 'Create a new product'
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
  body('ownerPhone').optional().notEmpty(),
  body('isActive').optional().isBoolean()
], ensureAuthenticated, ProductController.createProduct);

 
router.put('/product/:productId',
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
   [
  body('productName').optional().notEmpty(),
  body('price').optional().isNumeric(),
  body('description').optional().notEmpty(),
  body('category').optional().notEmpty(),
  body('subCategory').optional(),
  body('ownerName').optional().notEmpty(),
  body('ownerEmail').optional().isEmail(),
  body('ownerPhone').optional().notEmpty(),
  body('isActive').optional().isBoolean()
], ensureAuthenticated, ProductController.updateProduct);

// delete contact data
router.delete('/product/:productId',
         /*
          #swagger.summary = 'Delete product by id'
      */
    [
     
    param('productId').isMongoId().withMessage('Valid product ID is required')
], ensureAuthenticated,  ProductController.deleteProduct);





export default router