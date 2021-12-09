import product from '../models/product';
import User from '../models/user';
export const userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec(); // tìm user dựa trên ID
        req.profile = user;
        next()
    } catch (error) {
        res.status(400).json({
            msg: 'User không tồn tại'
        })
    }

}
export const read = (req, res) => {
    const user = req.profile;

    user.hashed_password = undefined;
    user.salt = undefined;

    res.json(user);
}
