import { NextResponse } from "next/server";
import connect from "@/utils/db.js";
// import PostBlogs from "../../../../models/Tutor_request";
import Blog_Post from "../../../models/Blog_comment_schema";


export const POST = async (request) => {
    try {
        // Connect to the MongoDB database
        await connect();

        const {
            searchId, comment, date, bloggerName, time, userImgUrl
        } = await request.json();
        const newBlogCommentPostRequest = new Blog_Post({ searchId, comment, date, bloggerName, time, userImgUrl });
        // console.log('newBlogCommentPost', newBlogCommentPostRequest);

        const savedBlogCommentPostRequest = await newBlogCommentPostRequest.save();
        // console.log('SaveRequestComment', savedBlogCommentPostRequest);
        return NextResponse.json({
            message: "Comment stored successfully!",
            success: true,
            savedTutorRequest: savedBlogCommentPostRequest
        }, { status: 201 });
    } catch (error) {
        console.error("Database Error:", error.message);
        return NextResponse("Internal Server Error", { status: 500 });
    }
};
