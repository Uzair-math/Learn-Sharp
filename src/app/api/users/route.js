import { NextResponse } from "next/server"
import connect from "@/utils/db"
import {Users} from "@/models/Users"

export const  GET = async (request) => {
    try {
        await connect()

        const {searchParams} = new URL(request.url);
        const email = (searchParams.get('email'));
        
        const query = {
            email
        }
        console.log(query)
        if(query.email !== null){
            // console.log("query block")
            const users = await Users.findOne(query);
            return new NextResponse(JSON.stringify(users), {status: 200})
        }

        const users = await Users.find();
        return new NextResponse(JSON.stringify(users), {status: 200})
    } catch (error) {
        return new NextResponse("Database Error!", {status: 500})
    }
}