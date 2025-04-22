import mongoose  from "mongoose";

const {Schema} = mongoose;

const blogSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userImgUrl:{
        type: String
    },
    postDate: {
        type: String
    },
    role: {
        type: String
    },
    postImgUrl: {
        type: String
    },
    postDescription: {
        type: String
    }
})

export const Blogs = mongoose.models.Blogs || mongoose.model('Blogs', blogSchema) ;


