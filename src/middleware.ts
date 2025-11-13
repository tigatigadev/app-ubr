import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { ROLE_PERMISSIONS, PERMISSIONS } from '@/lib/constants'

export async function middleware(request: NextRequest) {
  const { pathname } = request

  // Public routes that don't require authentication
  const publicRoutes = [
    '/auth/login',
    '/auth/error',
    '/api/auth',
  ]

  // Static assets
  const staticRoutes = [
    '/_next',
    '/favicon.ico',
    '/manifest.json',
    '/api/health',
  ]

  // Check if the path is public or static
  if (
    publicRoutes.some(route => pathname.startsWith(route)) ||
    staticRoutes.some(route => pathname.startsWith(route))
  ) {
    return NextResponse.next()
  }

  // Get the session
  const session = await auth()

  if (!session) {
    // Redirect to login if no session
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Role-based access control
  const userRole = session.user.role
  const userPermissions = ROLE_PERMISSIONS[userRole] || []

  // Define route permissions
  const routePermissions: Record<string, string[]> = {
    '/dashboard': [PERMISSIONS.VIEW_DASHBOARD],
    '/hr': [
      PERMISSIONS.VIEW_EMPLOYEES,
      PERMISSIONS.MANAGE_ATTENDANCE,
      PERMISSIONS.VIEW_ATTENDANCE_REPORTS,
    ],
    '/finance': [
      PERMISSIONS.VIEW_FINANCIAL_REPORTS,
      PERMISSIONS.CREATE_FINANCIAL_REPORTS,
    ],
    '/inventory': [
      PERMISSIONS.VIEW_INVENTORY,
      PERMISSIONS.MANAGE_INVENTORY,
    ],
    '/bookings': [
      PERMISSIONS.VIEW_BOOKINGS,
      PERMISSIONS.MANAGE_BOOKINGS,
    ],
    '/projects': [
      PERMISSIONS.VIEW_PROJECTS,
      PERMISSIONS.MANAGE_PROJECTS,
    ],
    '/admin': [
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.MANAGE_OUTLETS,
      PERMISSIONS.VIEW_SYSTEM_LOGS,
    ],
  }

  // Check if user has permission for the requested route
  for (const [route, requiredPermissions] of Object.entries(routePermissions)) {
    if (pathname.startsWith(route)) {
      const hasPermission = requiredPermissions.some(permission =>
        userPermissions.includes(permission)
      )

      if (!hasPermission) {
        // Redirect to dashboard with access denied message
        const url = new URL('/dashboard', request.url)
        url.searchParams.set('error', 'access_denied')
        return NextResponse.redirect(url)
      }
      break
    }
  }

  // Outlet-based access control
  // Employees can only access data for their assigned outlet
  // Super admins and admins can access all outlets
  if (userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN') {
    const outletId = session.user.outletId

    // Add outlet filter to search params for data-fetching routes
    if (pathname.startsWith('/api/') && outletId) {
      const url = new URL(request.url)
      if (!url.searchParams.has('outletId')) {
        url.searchParams.set('outletId', outletId)
        return NextResponse.rewrite(url)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}