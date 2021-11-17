import express from 'express';
import { isAdmin, isAuth, requireSignin } from '../controllers/auth';

const router = express.Router();
import { list, create, read, update, remove } from '../controllers/category'
import { userById } from '../controllers/user';



router.get('/categories', list);
router.get('/category/:slug', read);
router.patch('/category/:slug', update);
router.post('/category/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/category/:slug', remove);

router.param('userId', userById)

module.exports = router;
