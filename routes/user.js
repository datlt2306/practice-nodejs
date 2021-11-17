import express from 'express';
import { isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { userById } from '../controllers/user';
const router = express.Router();

router.get('/user/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});
router.param('userId', userById)

module.exports = router;