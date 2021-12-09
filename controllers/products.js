import slugify from 'slugify';
import Product from '../models/product';

export const create = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.name);
        const product = await new Product(req.body).save();
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Tạo sản phẩm không thành công"
        })
    }
}
export const list = async (req, res) => {
    try {
        const products = await Product.find({}).exec();
        res.json(products)
    } catch (error) {
        console.log(error);
    }
}
export const listRelated = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const related = await Product.find({
        _id: { $ne: product._id },
        category: product.category
    })
        .limit(3)
        .populate('category')
        .exec();
    res.json(related);
}
export const search = async (req, res) => {
    const { query } = req.body;
    if (query) {
        const product = await Product.find({ $text: { $search: query } })
            .populate('category', '_id name')
            .exec()
        res.json(product)
    }
}