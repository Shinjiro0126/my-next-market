import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request){
  // const token = await request.headers.get("Authorization")?.split(" ")[1];
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTcyOTYzNzU2OX0.ABq0103q5XJ32QiR_DTfnc0atPKvNsJ2762r2Lnu74w";

if(!token){
  return NextResponse.json({message: "トークンがありません"})
}

try {
  const secretKey = new TextEncoder().encode("my-next-market")
  const decodedJwt = await jwtVerify(token, secretKey)
  console.log("decodedJwt:", decodedJwt)

  return NextResponse.next()
} catch {
  return NextResponse.json({message: "トークンが正しくない。再ログイン"})
}


  
}

export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
}