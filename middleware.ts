import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /admin/dashboard)
  const path = request.nextUrl.pathname

  // If it's the admin login page, don't need to check authentication
  if (path === '/admin/login') {
    return NextResponse.next()
  }

  // Check authentication for other admin routes
  if (path.startsWith('/admin')) {
    const isAuthenticated = request.cookies.get('adminAuthenticated')?.value === 'true'

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}
