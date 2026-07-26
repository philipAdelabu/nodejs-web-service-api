
import User from '../models/user.js';
import Profile from '../models/profile.js'
import Cart from '../models/cart.js';
import Order from '../models/profile.js';

class UserService {
     constructor(){

     }

     //// User Management section ////
     static async createUser(data = {}){
        if(!data) throw new Error('Bad request body');
        try{
           const user = await User.create(data);
          return user;
        }catch(error){
            throw error;
        }
     }

        static async deleteUserById(userId){
        try{
          const result = await User.findOneAndDelete({_id: userId});
          return result;
        }catch(error){
            throw error;
        }
     }

    

     static async getAllUsers(){
         try{
            const users = await User.find();
            return users;
         }catch(error){
            throw error;
         }
     }



     static async getUserById(userId){
         try{
            const result = await User.findOne({_id: userId });
            return result;
         }catch(error){
            throw error;
         }
     }


     static async updateUserById(userId, data){
        if(!data) throw new Error('Bad request body');
        try{
          const result = await User.findOneAndUpdate({_id: userId}, data, {new: true});
          return result;
        }catch(error){
            throw error;
        }
     }



      
    
}

export default UserService;