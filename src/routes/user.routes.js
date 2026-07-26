import express from 'express'
const router = express.Router();
import { body,  param, query, validationResult  } from 'express-validator';
import UserController from '../controllers/user.controller.js';



router.post('/user',
         /*
    #swagger.summary =  ' Create a new user '
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UserPost" }
        }
      }
    }
  */
     [
  body('username').notEmpty().isString(),
  body('isActive').optional().isBoolean(),
], UserController.createUser );

router.put('/user',
         /*
    #swagger.summary =  'Update existing user'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UserUpdate" }
        }
      }
    }
  */
     [
 body('username').notEmpty().isString(),
  body('isActive').optional().isBoolean(),
], UserController.createUser );


router.delete('/user/:userId',  /*
          #swagger.summary = 'Delete user by id'
      */ [
  param('userId').isMongoId(),
], UserController.deleteUser);

router.get('/all',  /*
          #swagger.summary = 'Get all users'
      */ UserController.getAllUsers);

router.get('/user/:userId',  /*
          #swagger.summary = 'Get user by id'
      */ [
  param('userId').isMongoId(),
], UserController.getUserById);


export default router