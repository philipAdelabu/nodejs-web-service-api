import express from 'express'
const router = express.Router({ mergeParams: true });
import { body,  param, query, validationResult } from 'express-validator';
import ContactController from '../controllers/contact.controller.js'


router.post('/contact',
      /*
    #swagger.summary = 'Create a new contact'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ContactCreate" }
        }
      }
    }
  */
    [
  body('firstName').notEmpty().withMessage('Name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional(),
  body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
  body('birthday').isDate().withMessage('Valid date is required')
],  ContactController.createContact);

// get contact data detail  
router.get('/contact/:contactId', 
     /*
          #swagger.summary = 'Get contact by id'
      */
   [
    param('contactId').isMongoId().withMessage('Valid contact ID is required')
], ContactController.getContact);

// get all contact data
router.get('/all',  /*
          #swagger.summary = 'Get  all contact'
      */ ContactController.getAllContacts);

 
router.put('/contact/:contactId', [
    param('contactId').isMongoId().withMessage('Valid contact ID is required'),
    body('firstName').optional().notEmpty().withMessage('Name is required'),
    body('lastName').optional().notEmpty().withMessage('Last name is required'),
    body('favoriteColor').optional().notEmpty().withMessage('Favorite color is required'),
    body('birthday').optional().isDate().withMessage('Valid date is required'),
    body('phone').optional(),
],
 
 /*
    #swagger.summary = 'Update an existing contact'
  
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ContactUpdate" }
        }
      }
    }
  */

ContactController.updateContact);

// delete contact data
router.delete('/contact/:contactId',  /*
          #swagger.summary = 'Delete contact by id'
      */ [
    param('contactId').isMongoId().withMessage('Valid contact ID is required')
], ContactController.deleteContact);


export default router