import connect from "@/utils/db.js"
import { NextResponse } from "next/server";
import { Bookings } from "../../../models/Bookings";

export const  POST = async (request) => {
    try {
       await connect()
       const {
        tuitionId,
        subject,
        class_name,
        service_location,
        available_days,
        salary,
        mobile,
        tutor_name,
        tutor_email,
        student_name,
        student_location,
        student_gender,
        student_mobile_number,
        student_qualification,
        student_email,
        student_photoURL,
        isAccepted} = await request.json()

        const query={
            student_email,
            tuitionId
        }
        const bookingExists = await Bookings.findOne(query);
        // console.log("api",bookingExists)
        if(bookingExists) {
            
         return NextResponse.json({ error: "Booking allready exists" }, { status: 404 });
        }

        const newBooking = new Bookings({
            tuitionId,
            subject,
            class_name,
            service_location,
            available_days,
            salary,
            mobile,
            tutor_name,
            tutor_email,
            student_name,
            student_location,
            student_gender,
            student_mobile_number,
            student_qualification,
            student_email,
            student_photoURL,
            isAccepted});

            const savedBooking = await newBooking.save();
            return NextResponse.json({ message: "Booking stored successfully!",
            success: true,
            savedBooking }, { status: 201 });


    } catch (error) {
        console.error("Database Error:", error.message);
        return NextResponse.error("Internal Server Error", { status: 500 });
    }
}