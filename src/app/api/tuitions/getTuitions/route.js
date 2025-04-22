import { NextResponse } from "next/server";
import connect from "@/utils/db.js";
import { Tuitions } from "@/models/Tuitions";

export const GET = async (request) => {
  try {
    // Connect to the MongoDB database
    await connect();

    // Retrieve all tuitions from the database
    const tuitions = await Tuitions.find({});

    return new NextResponse(
      {
        message: "Tuitions retrieved successfully!",
        success: true,
        tuitions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database Error:", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

