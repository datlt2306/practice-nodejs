import express from 'express';

const router = express.Router();
import { list, create, read, update, remove } from '../controllers/category'
import { demoMiddleWare } from '../middlewares/validate';


// endpoint
router.get('/categories', demoMiddleWare, list);
router.get('/category/:slug', read);
router.patch('/category/:slug', update);
router.post('/category', create);
router.delete('/category/:slug', remove);


module.exports = router;
