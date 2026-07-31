import User from '../models/user.js';
import bcrypt from 'bcrypt';



class AuthController {


   constructor(){}


   static async registerUser(req, res, next){
       try{
        const { displayName, email, password } = req.body;
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if(existingUser){
            req.flash('error_msg', 'Email is already registered');
            return res.redirect('/');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            displayName, 
            email: email.toLowerCase(), 
            password: hashedPassword
        });

        req.login(newUser, (err) => {
            if(err) return next(err);
            res.redirect('/dashboard');
        })
       }catch(err){
          res.status(500).send('Server Error');
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