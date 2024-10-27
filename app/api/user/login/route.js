import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { SignJWT } from "jose";


export async function POST(request){
  const reqBody = await request.json();

  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({
      email: reqBody.email
    })
    console.log(savedUserData);

    if (savedUserData) {

      if(reqBody.password === savedUserData.password){
        const secretKey = new TextEncoder().encode("my-next-market")
        const payload = {
          email: reqBody.email
        }
        const token = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime("1d").sign(secretKey)
        // const token = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime("id").sign(secretKey)

        return NextResponse.json({
          message: "ログイン成功",
          token: token
        })
      } else {
        return NextResponse.json({
          message: "ログイン失敗：パスワード違う"
        })
      }
    } else {
      return NextResponse.json({
        message: "ログイン失敗：登録がありません"
      })
    }
  } catch {
    return NextResponse.json({
      message: "ログイン失敗"
    })
  }

  
}
