import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  // Define your schema fields here
  postImgUrl: {
    type: String
  },
  postDescription: {
    type: String,
  },
  postDate: {
    type: String,
  },
  userName: {
    type: String,
  },
  userRole: {
    type: String,
  },
  userImgUrl: {
    type: String,
  },
},{
  versionKey: false, // Disable the __v field
});

const Blog_Post = mongoose.models.Blog_Post || mongoose.model('Blog_Post', blogPostSchema);

export default Blog_Post;
