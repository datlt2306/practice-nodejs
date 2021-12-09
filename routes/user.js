import express from 'express';
import { isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { read, userById } from '../controllers/user';
const router = express.Router();

// Kiểm tra là admin
router.get('/user/secret/:userId', requireSignin, isAuth, isAdmin, read);

// Trả về thông tin user
router.get('/user/:userId', requireSignin, isAuth, read);
router.param('userId', userById);


module.exports = router;