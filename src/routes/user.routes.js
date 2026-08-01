import express from 'express'
const router = express.Router();
import { body,  param, query, validationResult  } from 'express-validator';
import UserController from '../controllers/user.controller.js';
import ensureAuthenticated from '../middleware/ensureAthenticated.js'; 

router.put('/user/:userId', [
  param('userId').isMongoId(),
  body('password').optional(),
  body('displayName').optional(),
  body('isActive').optional().isBoolean(),
], 
 /*
    #swagger.summary = 'Create new user'
  
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UserUpdate" }
        }
      }
    }
  *


ensureAuthenticated, UserController.updateUser );


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