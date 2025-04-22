import connect from "../../../../utils/db";
import { Bookings } from "../../../../models/Bookings";
import { NextResponse } from "next/server";
export const GET = async (request) => {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const tutor_email = searchParams.get("tutor_email");
    const student_email = searchParams.get("student_email");
    const isAccepted = searchParams.get("is_accepted");

    const query = {
      
    };
    if(tutor_email){
      query.tutor_email = tutor_email;
    }
    if(student_email){
      query.student_email = student_email;
    }
    if( isAccepted === "true" ){
      query.isAccepted = true;
    }
    console.log(query);
    const hasValidQuery = Object.keys(query).length > 0;
    if (hasValidQuery) {
      const bookingData = await Bookings.find(query);
      return new NextResponse(JSON.stringify(bookingData), { status: 200 });
    }

    const allBookingData = await Bookings.find();
    return new NextResponse(JSON.stringify(allBookingData), { status: 200 })

  } catch (error) {
    console.error("Database Error:", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
