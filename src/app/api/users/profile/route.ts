import { connect } from "@/dbConfig/dbConfig";
import UserDetail from "@/models/userDetails";
import {redis} from '@/dbConfig/redis';
import { NextRequest, NextResponse } from "next/server";

connect();


export async function POST(request: NextRequest) {
    try {


        const reqBody = await request.json();
        const userDetail = reqBody;
        const userEmail = userDetail.userEmail;

        


        const userProfile = userDetail.userProfile;
        const name = userDetail.name;
        const phone = userDetail.phone;
        const bio = userDetail.bio;
        const skills = userDetail.skills;
        const certificates = userDetail.certificates;
        const experience = userDetail.experience;
        const education = userDetail.education;

      
        const existingUserDetail = await UserDetail.findOne({ userEmail });

        if (existingUserDetail) {
            
            existingUserDetail.userProfile = userProfile;
            existingUserDetail.name = name;
            existingUserDetail.phone = phone;
            existingUserDetail.bio = bio;
            existingUserDetail.skills = skills;
            existingUserDetail.certificates = certificates;
            existingUserDetail.experience = experience;
            existingUserDetail.education = education;

            const updatedUserDetail = await existingUserDetail.save();

            await redis.set(`${userEmail}`,JSON.stringify(updatedUserDetail));

            return NextResponse.json({
                message: "User details updated successfully",
                success: true,
                updatedUserDetail
            });
        } else {
           
            const newUserDetail = new UserDetail({
                userEmail,
                userProfile,
                name,
                phone,
                bio,
                skills,
                certificates,
                experience,
                education,
            });

            const savedUserDetail = await newUserDetail.save();

            await redis.set(`${userEmail}`,JSON.stringify(savedUserDetail));

            return NextResponse.json({
                message: "User created successfully",
                success: true,
                savedUserDetail
            });
        }
    } catch (error: any) {
        console.error("Error:", error); 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    try {
        const userEmail = request.nextUrl.searchParams.get('userEmail');

        const cachedValue = await redis.get(`${userEmail}`)

         

        if (!userEmail) {
            return NextResponse.json({ message: "userEmail parameter is required" }, { status: 400 });
        }

        const userDetail = await UserDetail.findOne({ userEmail });

        if (!userDetail) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }


        return NextResponse.json({
            message: "User details retrieved successfully",
            userDetail
            
        });
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
