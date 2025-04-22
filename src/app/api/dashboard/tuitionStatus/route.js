import connect from "@/utils/db.js";
import { Tuitions } from "@/models/Tuitions";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const controlAdminBtn = searchParams.get("controlAdminBtn");
		const id = searchParams.get("id");
		const feedback = searchParams.get("feedback");

		const query = { id };
		const feedback_query = {};

    if (feedback) {
      feedback_query.admin_feedback = feedback;
    }

		// console.log("Feedback Query: ", feedback_query);

		// Add or Update Feedback
		const hasValidQuery = Object.keys(feedback_query).length > 0;
		if (hasValidQuery) {
			const tutorRequest = await Tuitions.findByIdAndUpdate(id, feedback_query);
			return NextResponse.json({ tutorRequest }, { status: 200 });
		}

		if (controlAdminBtn == "approve") {
			const users = await Tuitions.findByIdAndUpdate(id, { isVerified: true });
			return NextResponse.json({ users }, { status: 200 });
		} 
		else if (controlAdminBtn == "deny") {
			const users = await Tuitions.findByIdAndUpdate(id, { isVerified: false });
			return NextResponse.json({ users }, { status: 200 });
		}
	} 
	catch (error) {
		console.error("Database Error: ", error.message);
		return new NextResponse.error("Internal Server Error!", { status: 500 });
	}
};