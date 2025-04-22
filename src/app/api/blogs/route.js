import { NextResponse } from 'next/server';
import { Blogs } from '../../../models/Blogs';
import connect from '../../../utils/db';

export const GET = async (request) => {
    try {
        await connect();
        const blogs = await Blogs.find();
		return new NextResponse(JSON.stringify(blogs), { status: 200 })
    } catch (error) {
		return new NextResponse("Database Error!", { status: 500 })
    }
} 