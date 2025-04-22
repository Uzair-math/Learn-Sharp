import connect from '@/utils/db.js';
import Tutor_request from "@/models/Tutor_request";
import { NextResponse } from 'next/server';

// Establish a database connection

// Define a route for handling GET requests
export const GET = async (request) => {
	try {
		await connect();
		// Perform a query to fetch data from the "Tutor_request" collection
		const tutorRequest = await Tutor_request.find();
		// console.log(tutorRequest)
		// Return the fetched data as a JSON response
		return new NextResponse(JSON.stringify(tutorRequest), { status: 200 })
	} catch (error) {
		console.error("Database Error: ", error.message);
		// Return an error response if something goes wrong
		return NextResponse("Internal Server Error", { status: 500 });
	}
};
