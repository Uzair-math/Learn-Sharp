import { NextResponse } from "next/server";
import connect from "@/utils/db.js";
// import PostBlogs from "../../../../models/Tutor_request";
import Blog_Post from "../../../../models/Blog_Post";


// import { Users } from "@/models/Users"; 

export const POST = async (request) => {
  try {
    // Connect to the MongoDB database
    await connect();
    
    // Parse request body
    const { 
      postImgUrl, postDescription,postDate,userName,userRole
     } = await request.json();

 
    // Create a new user instance
    const newBlogPostRequest = new Blog_Post({ postImgUrl, postDescription,postDate,userName,userRole});
    // console.log('newBlogPost',newBlogPostRequest);

    // Save the new user to the database
    const savedBlogPostRequest = await newBlogPostRequest.save();
    // console.log('SaveRequest',savedBlogPostRequest);

    return NextResponse.json({ message: "Users stored successfully!",
                               success: true,
                               savedTutorRequest: savedBlogPostRequest }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error.message);
    return NextResponse("Internal Server Error", { status: 500 });
  }
};
