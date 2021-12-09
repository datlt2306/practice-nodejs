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