import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('role')?.value;
  const { pathname } = request.nextUrl;

  // Define your login path clearly
  const LOGIN_PATH = '/login'; 

  // 1. Protect Dashboard & Admin
  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) && !token) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  // 2. Protect Admin specifically
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Redirect if already logged in
  if (pathname === LOGIN_PATH && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/admin/:path*', 
    '/login', 
    '/auth/signup'
  ],
};