import connect from "@/utils/db.js";
import Tutor_request from "../../../../models/Tutor_request";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
	try {
		await connect();
		const { searchParams } = new URL(request.url);
		const controlAdminBtn = searchParams.get("controlAdminBtn");
		const id = searchParams.get("id");
		const feedback = searchParams.get("feedback");

		const query = { id };
		const feedback_query = { };
		
		if (feedback) {
			feedback_query.admin_feedback = feedback;
		}

		// Add or Update Feedback
		const hasValidQuery = Object.keys(feedback_query).length > 0;
		if (hasValidQuery) {
			const adminFeedback = await Tutor_request.findByIdAndUpdate(id, feedback_query);
			return NextResponse.json({ adminFeedback }, { status: 200 });
		}

		if (controlAdminBtn == "approve") {
			const adminVerification = await Tutor_request.findByIdAndUpdate(id, { isVerified: true });
			return NextResponse.json({ adminVerification }, { status: 200 });
		} 

		else if (controlAdminBtn == "deny") {
			const adminVerification = await Tutor_request.findByIdAndUpdate(id, { isVerified: false });
			return NextResponse.json({ adminVerification }, { status: 200 });
		}

	} 
	catch (error) {
		console.error("Database Error:", error.message);
		return new NextResponse.error("Internal Server Error", { status: 500 });
	}
};