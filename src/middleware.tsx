import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the 'user' cookie
  const userCookie = request.cookies.get('user');
  const isLoggedIn = !!userCookie;

    // Define public routes where logged-in users should not be able to access
    const publicRoutes = ['/admin/signIn', '/admin/register'];

    // If the user is logged in and tries to access a public route, redirect them
    if (isLoggedIn && publicRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  
  
  // If the cookie does not exist, redirect to sign-in page
  if (!userCookie) {
    return NextResponse.redirect(new URL('/admin/signIn', request.url));
  }

  // Extract the string value from the cookie object
  const user = userCookie.value;

  if (request.url === '/admin/dashboard') {
    return NextResponse.next(); // Continue with the request if already on the dashboard
  }
  // Parse the cookie value to extract user data
  let userData;
  try {
    userData = JSON.parse(user);
  } catch (error) {
    // If JSON parsing fails, redirect to sign-in page
    return NextResponse.redirect(new URL('/admin/signIn', request.url));
  }

  const uid = userData?.uid;
  // If UID is not available, redirect to sign-in page
  if (!uid) {
    return NextResponse.redirect(new URL('/admin/signIn', request.url));
  }

  // Perform the API request to check vendor status
  try {
    const res = await fetch('http://69.48.163.45:3000/vendor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid }),
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await res.json();

    // Redirect based on the response from the API
    if (data?.data?.isApproved) {
      return NextResponse.next();;
    } else {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  } catch (error) {
    console.error('Error fetching vendor data:', error);
    return NextResponse.redirect(new URL('/admin/signIn', request.url));
  }
}

// Config to apply this middleware to specific routes
export const config = {
  matcher: ['/dashboard/:path*'], // Apply middleware to all paths under /admin
};
