import express from 'express'
const router = express.Router({ mergeParams: true });
import contactRoutes from './contact.route.js';
import productRoutes from './product.routes.js';
import userRoutes from './user.routes.js'

router.get('/', (req, res) => { res.json( { name: 'cse341-api', date: Date.now()})})
router.use('/contacts', contactRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);

export default router


