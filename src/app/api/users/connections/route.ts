
import { connect } from "@/dbConfig/dbConfig";
import Person from "@/models/people";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const people = await Person.find();

    

    return NextResponse.json({ people });
  } catch (error) {
    console.error('Error:', error);
  }
}


export async function PUT(request: NextRequest, response: NextResponse) {
   
  
    try {
  
      const personId =  request.nextUrl.searchParams.get('itemId');
      const action =  request.nextUrl.searchParams.get('action');

      
      let isconnected;
    if (action === "connect") {
      isconnected = true;
    } else if (action === "disconnect") {
      isconnected = false;
    } else {
      return NextResponse.json({ message: "Invalid action" });
    }

    const updatedPerson = await Person.findByIdAndUpdate(
      personId,
      { isconnected }
    );

  
      if (!updatedPerson) {
        NextResponse.json({ message: "Person not found" });
      }
  
      return NextResponse.json(updatedPerson);
    } catch (error) {
      console.error("Error:", error);
      NextResponse.json({ message: "Server error" });
    }
  }
