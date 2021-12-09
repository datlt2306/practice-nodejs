import express from 'express';
import { create, listRelated, search, list } from '../controllers/products';
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id: 
 *        type: string
 *        description: The auto-generated id of the product
 *      name: 
 *        type: string
 *        description: the name of product
 *      description:
 *        type: string
 *        description: the description
 *      price:
 *        type: number
 *        description: the price
 *    example: 
 *      id: _fdakfakhfa
 *      name: Product A
 *      description: Mo ta san pham
 *      price: 200
 */

router.post('/product', create);
router.get('/products', list);
router.get('/product/related/:productId', listRelated);
router.post('/product/search', search);

module.exports = router;