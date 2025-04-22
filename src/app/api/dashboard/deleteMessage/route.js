import connect from "../../../../utils/db";
import { NextResponse } from "next/server";
import { Student_Message } from "../../../../models/Student_Message";

export const DELETE = async (request) => {
    try {
        await connect();
        const { searchParams } = new URL(request.url);
        const messageId = searchParams.get('id');

        if (!messageId) {
            return new NextResponse("Message ID not provided", { status: 400 });
        }

        // Find the message by ID and delete it
        const deletedMessage = await Student_Message.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return new NextResponse("Message not found", { status: 404 });
        }

        return new NextResponse("Message deleted successfully", { status: 200 });
    } catch (error) {
        return new NextResponse("Database Error", { status: 500 });
    }
};
