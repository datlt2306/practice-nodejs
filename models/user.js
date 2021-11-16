import mongoose from 'mongoose';
import { v4 as uuid4 } from 'uuid';
import { createHmac } from 'crypto';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },

    hashed_password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true });

userSchema.virtual('password')
    .set(function (password) { // abcde
        this.salt = uuid4(); //9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
        this.hashed_password = this.encrytPassword(password);
    });

userSchema.methods = {
    authenticate(password) {
        return this.encrytPassword(password) == this.hashed_password;
    },
    encrytPassword(password) {
        if (!password) return;
        try {
            return createHmac('sha256', this.salt).update(password).digest('hex');
        } catch (error) {
            console.log(error);
        }
    }
}



export default mongoose.model('User', userSchema);