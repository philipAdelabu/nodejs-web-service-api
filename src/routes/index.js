import express from 'express'
const router = express.Router({ mergeParams: true });

import contactRoutes from './contact.route.js';
import productRoutes from './product.routes.js';
import userRoutes from './user.routes.js'
import authRouutes from './auth.routes.js';



router.get('/', (req, res) => {
  if(req.isAuthenticated()) res.json( { name: 'cse341-api',
  message:'You are now logged In.', date: Date.now()});
  res.json({message: 'You are logged out.'});
});

router.use('/auth', authRouutes); 
router.use('/contacts', contactRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);

export default router


