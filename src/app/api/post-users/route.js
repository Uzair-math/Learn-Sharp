import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Log the mock user creation
    console.log("Mock user created:", body);
    
    // Create a mock user
    const mockUser = {
      _id: 'mock-user-id-' + Math.random().toString(36).substring(2, 10),
      ...body,
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json({ 
      success: true,
      message: "User created successfully",
      user: mockUser
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Error creating user" },
      { status: 500 }
    );
  }
}
