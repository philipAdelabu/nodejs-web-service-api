import express from 'express'
const router = express.Router({ mergeParams: true });
import passport from 'passport';
import AuthController from '../controllers/auth.controller.js'
import { body,  param, query, validationResult  } from 'express-validator';



// github handlers 
router.get('/github', passport.authenticate('github', {scope: ['user:email']}));

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/',
   failureFlash: true
}), (req, res) => res.redirect('/api-docs'));

router.post('/local/register', 
   /*
    #swagger.summary = 'Create new user'
  
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/UserCreate" }
        }
      }
    }
  */
  [
  body('displayName').notEmpty(),
  body('email').isEmail().notEmpty(),
  body('password').notEmpty(),
], AuthController.registerUser);

router.post('/local/login',
    /*
  #swagger.summary = 'Login user'
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "user@example.com"
            },
            password: {
              type: "string",
              example: "mypassword123"
            }
          }
        }
      }
    }
  }
*/

  [
  body('email').isEmail().notEmpty(),
  body('password').notEmpty(),
], (req, res, next)=>{
    passport.authenticate('local', {
     successRedirect: '/',
     failureRedirect: '/',
     failureFlash: true,
})(req, res, next) });



router.get('/logout', AuthController.logoutUser);

export default router;