import { NextResponse, type NextRequest } from 'next/server';
import { decodeJwt } from 'jose';
import { ROLE_ROUTES, PUBLIC_ROUTES, ROUTES_PATH, UserRole } from './src/core/routes/routes';

interface JwtPayload {
  role: UserRole;
  exp?: number;
  [key: string]: any;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('jwt')?.value;
  if (!token) {
    return NextResponse.redirect(new URL(ROUTES_PATH.signin, request.url));
  }

  try {
    const payload = decodeJwt(token) as JwtPayload;
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTime) {
      const response = NextResponse.redirect(new URL(ROUTES_PATH.signin, request.url));
      response.cookies.delete('jwt');
      return response;
    }

    const userRole = payload.role;
    const roleConfig = ROLE_ROUTES[userRole];

    if (!roleConfig) {
      return NextResponse.redirect(new URL(ROUTES_PATH.signin, request.url));
    }


    if (roleConfig.forbidden.length > 0) {
      const isRestricted = roleConfig.forbidden.some(route => pathname.startsWith(route));
      if (isRestricted) {
        return NextResponse.redirect(new URL(roleConfig.allowed[0], request.url));
      }
    }


    const isAllowed = roleConfig.allowed.some(route => 
      pathname === route || pathname.startsWith(`${route}/`)
    );
    
    if (!isAllowed) {
      return NextResponse.redirect(new URL(roleConfig.allowed[0], request.url));
    }


    return NextResponse.next();

  } catch (error) {
    const response = NextResponse.redirect(new URL(ROUTES_PATH.signin, request.url));
    response.cookies.delete('jwt');
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};