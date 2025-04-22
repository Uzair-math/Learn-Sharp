import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import { Tuitions } from "@/models/Tuitions";

export const GET = async (request) => {
	try {
		await connect()

		const { searchParams } = new URL(request.url);
		const email = (searchParams.get('email'));
		const isVerified = (searchParams.get('isVerified'));
		const query = {
			tutor_email: email,
		}
		//single page show data admin isVerified only.
		if (isVerified === "true") {
			query.isVerified = true;
		}
		// console.log(query)
		if (query.tutor_email !== null) {
			const tuitions = await Tuitions.find(query);
			return new NextResponse(JSON.stringify(tuitions), { status: 200 })
		}
		const tuitions = await Tuitions.find();
		return new NextResponse(JSON.stringify(tuitions), { status: 200 })
	} catch (error) {
		return new NextResponse("Database Error!", { status: 500 })
	}
};
