import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Mock user data
    const mockUser = {
      _id: 'mock-user-id-' + Math.random().toString(36).substring(2, 10),
      email: email,
      displayName: email.split('@')[0] || 'User',
      photoURL: 'https://example.com/photo.jpg',
      gender: 'Not specified',
      mobileNumber: '123456789',
      qualification: 'Not specified',
      location: 'Not specified',
      role: 'student'
    };
    
    return NextResponse.json(mockUser);
  } catch (error) {
    console.error("Mock API error:", error);
    return NextResponse.json({ message: "Error processing request" }, { status: 500 });
  }
}; 