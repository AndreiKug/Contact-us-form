import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    // uploadFile: String

}, {
    timestamps: true,
});

export default mongoose.model('Form', FormSchema);