

to get params using next function
  const token  = request?.nextUrl.searchParams.get("token")


// create redirect url to throw a perticuler page in next
  function redirectToError(request: NextRequest, reason: string) {
    const errorUrl = new URL("/error", request?.url)

    errorUrl.searchParams.set("reason", reason)
    return NextResponse.redirect(errorUrl)
}


CLERK_SETUP
goo to clerk --> https://oneminute.run/clerk-marketplace

after adding main signup page go to configure and then  devlopers-->api keys

for signup functionality 
in signup page
import { useSignUp } from "@clerk/nextjs"; this is urility function by clerk

