import User from '../models/user';
export const userById = async (req, res, next, id) => {
    const user = await User.findById(id).exec(); // tìm user dựa trên ID
    req.profile = user;
    next()
}

