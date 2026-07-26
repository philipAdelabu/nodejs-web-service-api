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

    static async getUserById(req, res, next){
      const errors = validationResult(req);
    if(!errors.isEmpty()){
       return sendError(res, 'Validation error', 400, errors.array());
    }
      try{
        const user = UserService.getUserById(req.params.userId);
        sendSuccess(res, user, 'User retrieeved successfully');
      }catch(error){
        sendError(res, error.message || 'Fail to retrieve user', error.statusCode || 500);
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
        sendSuccess(res, user, 'User deleted successfully', 201);
      }catch(error){
        sendError(res, error.message || 'Fail to delete user', error.statusCode || 500);
        next(error);
      }
  }

   static async getAllUsers(req, res, next){
 
      try{
        const users = UserService.getAllUsers();
        sendSuccess(res, users, 'All users retrieved successfully', 200);
      }catch(error){
        sendError(res, error.message || 'Fail to delete user', error.statusCode || 500);
        next(error);
      }
  }

   


}

export default UserController;