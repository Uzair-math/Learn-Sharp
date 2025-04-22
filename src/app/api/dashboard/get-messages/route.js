import connect from "../../../../utils/db";
import { NextResponse } from "next/server";
import { Student_Message } from "../../../../models/Student_Message";

export const GET = async (request) => {
	try {
		await connect()
		const { searchParams } = new URL(request.url);
		const tutor_email = searchParams.get('tutor_email');
		const student_email = searchParams.get('student_email');

		const query = {

		}
        if(tutor_email){
            query.tutor_email = tutor_email;
        }
        if(student_email){
            query.student_email = student_email;
        }

        console.log('get-messages route', query)
        const hasValidQuery = Object.keys(query).length > 0;
        if( hasValidQuery){
            console.log('get-messages route block', query)
            const messages = await Student_Message.find(query)
            return new NextResponse(JSON.stringify(messages), {status: 200})
        }

        const allMessages = await Student_Message.find();
        return new NextResponse(JSON.stringify(allMessages), { status: 200 });
        
        
    } catch (error) {
        return new NextResponse("Database Error",{status: 500});
    }
}