import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { Users } from "@/models/Users";

export const GET = async (request) => {
  try {
    await connect();

    const sortingOptions = {
      students: -1, // Sort by students in descending order
      ratings: -1, // Then sort by ratings in descending order
    };
    const query = {
      role: "tutor",
      isVerified: true
    }

    const limit = 4;
    const tutors = await Users.find(query).sort(sortingOptions).limit(limit);

    return new NextResponse(JSON.stringify(tutors), { status: 200 });
  } 
  catch (error) {
    return new NextResponse("Error in database!", { status: 500 });
  }
};