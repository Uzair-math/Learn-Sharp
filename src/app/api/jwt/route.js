import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const body = await request.json();
		const email = body.email;

		// Mock JWT token generation
		const token = email ? `mock-jwt-token-for-${email}` : null;
		
		// Set a mock cookie
		const response = NextResponse.json({ 
			success: true,
			message: 'JWT token created successfully'
		});
		
		if (token) {
			response.cookies.set('token', token, {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 30, // 30 days
			});
		} else {
			response.cookies.delete('token');
		}
		
		return response;
	} catch (error) {
		console.error("JWT Error:", error);
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
