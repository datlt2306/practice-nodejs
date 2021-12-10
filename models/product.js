import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 255,
        text: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        text: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    shipping: {
        type: String,
        enum: ["yes", "no"]
    },
    color: {
        type: String,
        enum: ["Black", "Brown", "Silver", "White", "Blue"]
    },
    brand: {
        type: String,
        enum: ["Apple", "Samsung", "Lenovo", "Asus"]
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);

/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      price:
 *        type: number
 *      category:
 *        type: string
 *      sold:
 *        type: number
 *      images:
 *        type: array
 *        items:
 *         type: string
 *      shipping:
 *        type: boolean
 *      color:
 *        type: string
 *      brand:
 *        type: string
 *    required:
 *     - name
 *     - description
 *     - price
 *    example:
 *      id: _fdakfakhfa
 *      name: Product A
 *      description: Mo ta san pham
 *      price: 200
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: API dành cho Product
 */