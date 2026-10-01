import { createClerkClient, verifyToken } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const roles = ["client", "freelancer"] as const
type SignupRole = (typeof roles)[number]

// HELPER FUNCTIONS

// if some one try to access 
// http://localhost:3000/api/v1/signup/?token=unknownToken then we redirect to error page
function redirectToError(request: NextRequest, reason: string) {
  const errorUrl = new URL("/error", request?.url)

  errorUrl.searchParams.set("reason", reason)
  return NextResponse.redirect(errorUrl)
}

function isSignupRole(value: string | null): value is SignupRole {
  return roles.some((role) => role === value)
}

// HELPER FUNCTIONS


export async function GET(request: NextRequest) {
  const token = request?.nextUrl.searchParams.get("token")
  const role = request?.nextUrl.searchParams.get("role")
  const secretKey = process.env.CLERK_SECRET_KEY

  if (!token || !role) {
    return redirectToError(request, "misssing_signup_up_details")
  }

  if (!isSignupRole(role)) {
    return redirectToError(request, "invalid_role")
  }

  if (!secretKey) {
    console.error("CLERK_SECRET_KEY is not configured")
  }


  try {
    const claims = await verifyToken(token,{
      secretKey: secretKey,
    })

    const clerk = createClerkClient({ secretKey,
    });


    const res = await fetch(`https://api.clerk.dev/v1/signup_tokens/${token}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return redirectToError(request, "invalid_token")
    }

    const data = await res.json();

    if (data.role !== role) {
      return redirectToError(request, "role_mismatch")
    }

    // If everything is valid, return the token and role as JSON
    return NextResponse.json({ token, role });
  } catch (error) {
    console.error("Error fetching signup token:", error);
    return redirectToError(request, "server_error")
  }


}
