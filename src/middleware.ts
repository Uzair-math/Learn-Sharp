import { NextRequest, NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	// console.log(path, 'path');

	const token = request.cookies.get('token')?.value || '';
	const isPublicPath = ['/login', '/register'].includes(path);
	// const isProtectedPath = ['/profile', '/dashboard'].includes(path);

	if (isPublicPath && token) {
		return NextResponse.redirect(new URL('/', request.nextUrl))
	}
	// else if (isProtectedPath || path.startsWith('/tutor/') && !token) {
	// 	return NextResponse.redirect(new URL('/login', request.nextUrl))
	// }
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/',
		'/profile',
		'/login',
		'/register',
		'/tutor/:path*'],
}