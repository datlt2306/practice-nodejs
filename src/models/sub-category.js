import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required",
        minlength: [3, "Too short"],
        maxlength: [32, "Too Long"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    parent: { type: ObjectId, ref: "Category", required: true}
}, { timestamps: true });

export default mongoose.model('SubCate', subCategorySchema);