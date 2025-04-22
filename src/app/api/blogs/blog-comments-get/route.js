import { NextResponse } from 'next/server';
import BlogCommentPost from "../../../../models/Blog_comment_schema";
// import connect from '../../../../utils/db';
import connect from '@/utils/db';

export const GET = async (request) => {
    try {
        await connect();
        const blogs = await BlogCommentPost.find();
		return new NextResponse(JSON.stringify(blogs), { status: 200 })
    } catch (error) {
		return new NextResponse("Database Error!", { status: 500 })
    }
} 