import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogCommentSchema = new mongoose.Schema({
    searchId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    bloggerName: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    userImgUrl: {
        type: String,
    }
}, {
    versionKey: false,
});

const Blog_Comment_Post = mongoose.models.Blog_Comment_Post || mongoose.model('Blog_Comment_Post', blogCommentSchema);

export default Blog_Comment_Post;