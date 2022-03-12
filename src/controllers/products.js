import slugify from 'slugify';
import Product from '../models/product';

/**
 * @swagger
 * /api/product:
 *  post:
 *   tags: [Products]
 *   summary: Tạo sản phẩm mới
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema: 
 *       $ref: '#/components/schemas/Product'
 *   responses:
 *    200:
 *     description: Tạo sản phẩm thành công
 *    400:
 *     description: Tạo sản phẩm không thành công
 */
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
/**
 * @swagger
 * /api/products:
 *  get:
 *   tags: [Products]
 *   summary: Trả về danh sách tất cả sản phẩm
 *   responses:
 *    200:
 *     description: List danh sách sản phẩm
 *     content: 
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Product'
 */
export const list = async (req, res) => {
    try {
        const products = await Product.find({}).exec();
        res.json(products)
    } catch (error) {
        console.log(error);
    }
}
/**
 * @swagger
 * paths:
 *  /api/product/{id}:
 *   get:
 *    tags: [Products]
 *    summary: Trả về thông tin một sản phẩm
 *    parameters:
 *     - in: path
 *       name: id
 *       schema: 
 *        type: string
 *       required: true
 *    responses:
 *     200:
 *      description: Trả về thông tin sản phẩm dựa trên id
 *     404:
 *      description: Không tìm thấy sản phẩm
 */
export const read = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.productId }).exec();
        if (!product) {
            res.status(404)
        }
        res.json(product);
    } catch (error) {
        console.log(error)
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
const handleQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } })
            .populate('category', '_id name')
            .populate('subs', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(product)
}
const handlePrice = async (req, res, price) => {
    try {
        let products = Product.find({
            price: {
                gte: price[0],
                lte: price[1]
            }
        })
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec()
        res.json(product)
    } catch (error) {
        
    }
}
const handleCategory = async (req, res, category) => {
    try {
        let products = await Product.find({category})
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}
const handleShipping = async (req, res, shipping) => {
    try {
        let products = await Product.find({shipping})
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}
const handleColor = async (req, res, color) => {
    try {
        let products = await Product.find({color})
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}
const handleBrand = async (req, res, brand) => {
    try {
        let products = await Product.find({brand})
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}
export const searchFilters = async (req, res) => {
    const { query, price, category, shipping, color, brand } = req.body;
    if(query){
        await handleQuery(req, res, query);
    }
    // [20, 100]
    if(price != undefined){
        await handlePrice(req, res, price)
    }
    if(category){
        handleCategory(req, res, category)
    }
    if(shipping){
        handleShipping(req, res, shipping)
    }
    if(color){
        handleColor(req, res, color)
    }
    if(brand){
        handleBrand(req, res, brand)
    }
}