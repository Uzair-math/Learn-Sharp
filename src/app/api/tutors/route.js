import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { Users } from "@/models/Users";

export const GET = async (request) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const gender = searchParams.get("gender");

		// Create a filter object based on the provided query parameters
		const filter = {
			role: "tutor",
			isVerified: true,
		};

		if (gender === "male" || gender === "female") {
			filter.gender = gender;
		}

		// Check if both gender and premium are not provided in the query parameters
		if (!gender) {
			// If both are not provided, find all tutors without any filters
			const tutors = await Users.find(filter);
			return new NextResponse(JSON.stringify(tutors), { status: 200 });
		}

		// Use Mongoose to find tutors based on the filter
		const tutors = await Users.find(filter);

		return new NextResponse(JSON.stringify(tutors), { status: 200 });
	} 
	catch (error) {
		return new NextResponse("Database Error!", { status: 500 });
	}
};
