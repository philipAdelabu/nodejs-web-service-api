import { sendSuccess, sendError } from '../utils/responseMessage.js';
import { validationResult } from 'express-validator';
import UserService from '../services/user.service.js';


class UserController {
  constructor(){}

  static async createUser(req, res, next){
      
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return sendError(res, 'Validation error', 400, errors.array());
    }
    try{
       const user = await UserService.createUser(req.body); 
       sendSuccess(res, user, 'User created successfully', 201);
    }catch(error){
       sendError(res, error.message || 'Fail to create user', error.statusCode || 500);
       next(error);
    }
  }
  
   static async updateUser(req, res, next){
      
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return sendError(res, 'Validation error', 400, errors.array());
    }
    try{
       const user = await UserService.updateUser(req.params.userId, req.body); 
       sendSuccess(res, user, 'User updated successfully', 200);
    }catch(error){
       sendError(res, error.message || 'Fail to update user', error.statusCode || 500);
       next(error);
    }
  }
    static async getUserById(req, res, next){
          const errors = validationResult(req);
      if(!errors.isEmpty()){
        sendError(res, 'Validation error', 400, errors.array());
      }
        try{
        const userId = req.params.userId
           const result = await UserService.getUserById(userId);
           sendSuccess(res, result, 'The operation was successful');
        }catch(error){
            sendError(res, error.message || 'Failed to retrieve the user', error.statusCode || 500);
            next(error);
        }
    }

  static async deleteUser(req, res, next){
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        sendError(res, 'Validation error', 400, errors.array());
      }
      try{
        const user = UserService.deleteUserById(req.params.userId);
        sendSuccess(res, user, 'User deleted successfully');
      }catch(error){
        sendError(res, error.message || 'Fail to delete user', error.statusCode || 500);
        next(error);
      }
  }


     static async getAllUsers(req, res, next) { 
  
          try {
              const result = await UserService.getAllUsers()
               sendSuccess(res, result, 'Users successfully retrieved');
          } catch (error) {
              sendError(res, error.message || 'Failed to retrieve all users', error.statusCode || 500);
              next(error);
          }
      }

   


}

export default UserController;