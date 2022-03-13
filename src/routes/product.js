import express from 'express';
import { create, listRelated, list, read } from '../controllers/products';
const router = express.Router();

router.post('/product', create);
router.get('/products', list);
router.get('/product/:productId', read);
router.get('/product/related/:productId', listRelated);
// router.post('/product/search', search);

export default router;