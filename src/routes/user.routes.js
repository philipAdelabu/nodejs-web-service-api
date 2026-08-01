import express from 'express'
const router = express.Router();
import { body,  param, query, validationResult  } from 'express-validator';
import UserController from '../controllers/user.controller.js';
import ensureAuthenticated from '../middleware/ensureAthenticated.js'; 

router.put('/user/:userId', 
    /*
    #swagger.summary = 'Update user by id'
    #swagger.requestBody = {
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UserUpdate" }
        }
      }
    }
  */
  
  [
  param('userId').isMongoId(),
  body('password').optional(),
  body('displayName').optional(),
  body('isActive').optional().isBoolean(),
],  ensureAuthenticated, UserController.updateUser );


router.delete('/user/:userId',  /*
          #swagger.summary = 'Delete user by id'
      */ [
  param('userId').isMongoId(),
],ensureAuthenticated,  UserController.deleteUser);

router.get('/all',  /*
          #swagger.summary = 'Get all users'
      */ UserController.getAllUsers);

router.get('/user/:userId',  /*
          #swagger.summary = 'Get user by id'
      */ [
  param('userId').isMongoId(),
], UserController.getUserById);


export default router