import { NextRequest, NextResponse } from "next/server";

const roles = ["client" , "freelancer"] as const
type SignupRole = (typeof roles)[number]

// HELPER FUNCTIONS

// if some one try to access 
// http://localhost:3000/api/v1/signup/?token=unknownToken then we redirect to error page
function redirectToError(request: NextRequest, reason: string) {
    const errorUrl = new URL("/error", request?.url)

    errorUrl.searchParams.set("reason", reason)
    return NextResponse.redirect(errorUrl)
}

function isSignupRole(value : string | null) : value is SignupRole{
    return roles.some((role)=>role === value)
}

// HELPER FUNCTIONS


export async function GET(request: NextRequest) {
  const token  = request?.nextUrl.searchParams.get("token")
  const role = request?.nextUrl.searchParams.get("role")
  const secretKey = process.env.CLERK_SECRET_KEY

  if(!token || !role){
      return redirectToError(request , "misssing_signup_up_details")
  }
 
  if(!isSignupRole(role)){
    return redirectToError(request , "invalid_role")
  }

  if(!secretKey){
     console.error("CLERK_SECRET_KEY is not configured")
  }


}
