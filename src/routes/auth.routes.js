import express from 'express'
const router = express.Router({ mergeParams: true });
import passport from 'passport';
import AuthController from '../controllers/auth.controller.js'



// github handlers 
router.get('/github', passport.authenticate('github', {scope: ['user:email']}));
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/',
   failureFlash: true
}), (req, res) => res.redirect('/dashboard'));

router.post('/local/register', AuthController.registerUser);

router.post('/local/login', (req, res, next)=>{
    passport.authenticate('local', {
     successRedirect: '/dashboard',
     failureRedirect: '/',
     failureFlash: true,
})(req, res, next) });

router.get('/logout', AuthController.logoutUser);

export default router;