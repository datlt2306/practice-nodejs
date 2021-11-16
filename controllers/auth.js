import User from '../models/user';
import jwt from 'jsonwebtoken';

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

    const token = jwt.sign({ _id: user._id }, '123456');
    console.log('token', token)
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