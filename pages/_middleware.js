import { equal } from "assert";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    // Token will exist if the user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    //Allow the reqeusts if the following is true...
    // 1) its a request for nect-auth session & provider fetching 
    // 2) the token exists
    if(pathname.includes("/api/auth") || token){
        return NextResponse.next();
    }
     

    // Redirect them to login if they dontn have token and are requesting a protected route 

    if(!token && pathname !== "/login"){
        return NextResponse.redirect("/login");
    }
}