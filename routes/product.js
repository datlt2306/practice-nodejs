import express from 'express';
import { create, listRelated, search, list } from '../controllers/products';
const router = express.Router();

router.post('/product', create);
router.get('/products', list);
router.get('/product/related/:productId', listRelated);
router.post('/product/search', search);

module.exports = router;