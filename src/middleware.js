import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  
  if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    } 
    
    try {
        const decoded =  jwt.decode(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        console.log(decoded.role);
        
        if (decoded.role != 'user') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/employees/:path*'],
};
