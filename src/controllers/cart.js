import Cart from '../models/cart';
import User from '../models/user';
import Product from '../models/product';

export const userCart = async (req, res) => {
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();

    let cartExistByThisUser = await Cart.findOne({ orderBy: user._id }).exec();

    if (cartExistByThisUser) {
        cartExistByThisUser.remove();
        console.log('Remove orl cart');
    }
    for (let i = 0; i < cart.length; i++) {
        let object = {};
        object.product = cart[i]._id;
        object.count = cart[i].count

        let { price } = await Product.findById(cart[i]._id).select('price').exec();
        object.price = price;

        product.push(object);
    }

    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price + products[i].count;
    }
    console.log('cartTotal', cartTotal);

    let newCart = await new Cart({
        products,
        cartTotal,
        orderByUser
    }).save;

    res.json({ ok: true })
}