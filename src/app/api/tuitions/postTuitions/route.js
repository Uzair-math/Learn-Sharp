// route.js

import { NextResponse } from "next/server";
import connect from "@/utils/db.js";
import { Tuitions } from "@/models/Tuitions";

// Export a named function for handling POST requests
export const POST = async (request) => {
  try {
    // Connect to the MongoDB database
    await connect();

    // Parse request body
    const {
      tutor_name,
      tutor_email,
      subject,
      class_name,
      mobile,
      salary,
      gender,
      qualification,
      location,
      available_days,
      service_location,
      admin_feedback
    } = await request.json();

    // Create a new tuition instance
    const newTuition = new Tuitions({
      tutor_name,
      tutor_email,
      subject,
      class_name,
      mobile,
      salary,
      gender,
      qualification,
      location,
      available_days,
      service_location,
      admin_feedback
    });

    // Save the new tuition to the database
    const savedTuition = await newTuition.save();

    return new NextResponse(
      {
        message: "Tuition data stored successfully!",
        success: true,
        savedTuition,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database Error:", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
