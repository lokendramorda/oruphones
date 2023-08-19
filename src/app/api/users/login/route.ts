import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;


        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        
        
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);
        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}


export async function GET(request: NextRequest, response: NextResponse) {
    try {

        const email = request.nextUrl.searchParams.get('userEmail');

       const user = await User.findOne({ email });

       if (!user) {
           return NextResponse.json({ message: "User not found" }, { status: 404 });
       }


       return NextResponse.json({
           message: "User details retrieved successfully",
           user
           
       });
   } catch (error: any) {
       console.error("Error:", error);
       return NextResponse.json({ error: error.message }, { status: 500 });
   }
  }