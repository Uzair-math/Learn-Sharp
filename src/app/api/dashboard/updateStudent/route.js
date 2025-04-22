import connect from "@/utils/db.js";
import { Student_Message } from "../../../../models/Student_Message";
import { NextResponse } from "next/server";
export const PATCH = async (request) => {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const feedback = searchParams.get("feedback");
    // const role = searchParams.get("role");
    // console.log("manage tutors route",id, controlAdminBtn);


    const query2 = {

    }
    // all admin btn action
    // console.log("query",query);
    console.log("20", feedback)
    if(feedback){
      query2.admin_feedback = feedback;
    }
    console.log("20 ", query2)
    const hasValidQuery = Object.keys(query2).length > 0;
    if(hasValidQuery){
      console.log("manageTutors", query)
      const studentUpdate = await Student_Message.findByIdAndUpdate( id, query2 );
  return new NextResponse.json({studentUpdate }, { status: 200 });
    }
  } catch (error) {
    console.error("Database Error:", error.message);
    return new NextResponse.error("Internal Server Error", { status: 500 });
  }
};