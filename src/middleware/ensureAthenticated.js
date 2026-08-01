

function ensureAuthenticated(req, res, next) {
   if(req.isAuthenticated()) return next();
    res.json( { name: 'Hello User',
    message:'You are logged out, you have limited access. Please login to have full access',
    date: Date.now()})
}

export default ensureAuthenticated;