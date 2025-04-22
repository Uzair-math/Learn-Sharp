import connect from "@/utils/db";
import { Payments } from "@/models/Payments";
import { NextResponse } from "next/server";

export const GET = async (request) => {
	try {
		
		await connect();
		
		const { searchParams } = new URL(request.url);
		const tutor_email = searchParams.get("tutor_email");
		const student_email = searchParams.get("student_email");
		const payment_status = searchParams.get("payment_status");

		const query = { };

		if (tutor_email) {
			query.tutor_email = tutor_email;
			query.payment_status = payment_status;
		}
		if (student_email) {
			query.student_email = student_email;
			query.payment_status = payment_status;
		}
		// console.log("Query Check for Payments: ", query);

		const hasValidQuery = Object.keys(query).length > 0;
		
		if (hasValidQuery) {
			const paymentsData = await Payments.find(query);
			return new NextResponse(JSON.stringify(paymentsData), { status: 200 });
		}
		else {
			const paymentsData = await Payments.find();
      return new NextResponse(JSON.stringify(paymentsData), { status: 200 });
		}

	} 
	catch (error) {
		console.error("Database Error: ", error.message);
		return new NextResponse("Internal Server Error!", { status: 500 });
	}
};
