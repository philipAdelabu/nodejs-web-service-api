const GitHubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

export default function(){

      passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID, 
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback',
        scope: ['user:email'] // critical to ensure email access
      } , async (accessToken, refreshToken, profile, done) => {
         try {
          const email = profile.emails && profile.emails[0] ? 
                       profile.emails[0] : null;
           if(!email){
             return done(new Error('GitHub account must have a verified email address.'), null);
           }
           let user = await User.findOne({githubId: profile.id }) 
           if(!user){
             user = await User.findOne({email: email.toLowerCase()});
              if(user){
                 // account linking
                 user.githubId = profile.id;
                 await user.save();
              }else{
                 // create new user 
                 user = await User.create({
                    githubId: profile.id,
                    displayName: profile.displayName || profile.username, 
                    email: email.toLowerCase();
                    avatar: profile._json.avatar_url, 
                 })
              }
           }
           return done(null, user);
         }catch(error){
           return done(error, null);         
        }
      }));

      // Local strategy remains completely unchanged 
      passport.use( new LocalStrategy({
        usernameField: 'email'
      }, async (email, password, done) => {
         try{
          const user = await User.findOne({email: email.toLowerCase()});
          if(!user) return done(null, false, {message: 'That email is not the registered.'});
          if(!user.password) return done(null, false, {message: 'This email is linked to GitHub login.'});
          const isMatch = await bcrypt.compare(password, user.password);
          if(!isMatch) return done(null, false, {message: 'Password is incorrect'});
          return done(null, user);
         }catch(error){
           return done(error);
         }
      }));

      passport.serializeUser((user, done) => done(null, user.id));
      passport.deserializeUser(async (id, done) => {
         try {
            const user = await User.findById(id);
            done(null, user);
         }catch(error){
            done(error, null);
         }
      });
};