import User from '../models/user';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

export const signup = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await new User({ email, name, password }).save();
        res.json(user);
    } catch (error) {
        res.json({
            message: "Tạo user không thành công"
        })
    }

}
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
        res.status(400).json({
            msg: "Tài khoản không tồn tại"
        })
    }
    if (!user.authenticate(password)) {
        res.json({
            msg: "Email hoặc password không đúng"
        })
    }

    const token = jwt.sign({ _id: user._id }, '123456'); // encode: 
    res.cookie('token', token, { expire: new Date() + 9999 });

    res.json({
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
}
export const signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        msg: "Signout Successfully"
    })
}
export const requireSignin = expressJwt({ // decode
    secret: '123456',
    algorithms: ["HS256"],
    userProperty: "auth" // req.auth
});
export const isAuth = (req, res, next) => {
    // console.log('req profile', req.profile);
    // console.log('req', req.auth);
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    // console.log(user);
    if (!user) {
        res.json({
            msg: "Access Denined"
        })
    }
    next();
}
export const isAdmin = (req, res, next) => {
    console.log('req profile', req.profile);
    if (req.profile.role === 0) {
        return res.status(403).json({
            msg: "Bạn không có quyền truy cập"
        })
    }
    next();
}