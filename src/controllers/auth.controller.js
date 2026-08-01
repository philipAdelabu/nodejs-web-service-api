import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { sendSuccess, sendError } from '../utils/responseMessage.js';



class AuthController {


   constructor(){}


   static async registerUser(req, res, next){
       try{
        const { displayName, email, password } = req.body;
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if(existingUser){
            return res.json({message: 'Email is already registered', data: Date.now()});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            displayName, 
            email: email.toLowerCase(), 
            password: hashedPassword,
        });

        req.login(newUser, (err) => {
            if(err) return next(err);
            res.redirect('/');
        })
       }catch(error){
           sendError(res, error.message || 'Failed to register user', error.statusCode || 500);
       }   
   }

   static async logoutUser(req, res, next){
       req.logout((err) => {
           if(err) return next(err);
           req.flash('success_msg', 'You are logged out.');
           res.redirect('/');
       });
   }

}

export default AuthController;