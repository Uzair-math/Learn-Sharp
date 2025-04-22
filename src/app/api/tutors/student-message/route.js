import { NextResponse } from "next/server";
import connect from "@/utils/db.js";
import { Student_Message } from "@/models/Student_Message"

export const POST = async (request) => {
	try {
		// Connect to the MongoDB database
		await connect();

		// Parse request body
		const {
      tutor_email,
      tutor_name,
      tutor_mobile_number,
      tutor_location,
      tutor_gender,
      tutor_qualification,
      student_name,
      student_email,
      student_mobile_no,
      subject_name,
      student_location,
      student_gender,
      class_name,
      details,
      tutor_feedback,
    } = await request.json();

		// check existing users
		// const query = {
		// 	student_email,
		// 	tutor_email,
		// 	subject_name,
		// 	class_name
		// };

		// const user = await Student_Message.findOne(query);

		// if (user) {
		// 	return new NextResponse({ status: 400 })
		// }

		// Create a new user instance
		const newUser = new Student_Message({
      tutor_email,
      tutor_name,
      tutor_mobile_number,
      tutor_location,
      tutor_gender,
      tutor_qualification,
      student_name,
      student_email,
      student_mobile_no,
      subject_name,
      student_location,
      student_gender,
      class_name,
      details,
      tutor_feedback,
    });

		// Save the new user to the database
		const saveUser = await newUser.save();

		return new NextResponse({
			message: "Message sent successfully!",
			success: true,
			saveUser
		}, { status: 201 });
	} 
	catch (error) {
		console.error("Database Error: ", error.message);
		return new NextResponse("Internal Server Error!", { status: 500 });
	}
};
