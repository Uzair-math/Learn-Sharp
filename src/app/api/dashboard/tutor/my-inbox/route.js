import connect from "@/utils/db.js";
import { Student_Message } from "@/models/Student_Message";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const feedback = searchParams.get("feedback");

		const feedback_query = {};

		if (feedback) {
			feedback_query.tutor_feedback = feedback;
		}

		// Add or Update Feedback
		const hasValidQuery = Object.keys(feedback_query).length > 0;
		if (hasValidQuery) {
			const feedback = await Student_Message.findByIdAndUpdate(id, feedback_query);
			return NextResponse.json({ feedback }, { status: 200 });
		}
	} 
	catch (error) {
		console.error("Database Error: ", error.message);
		return new NextResponse.error("Internal Server Error!", { status: 500 });
	}
};