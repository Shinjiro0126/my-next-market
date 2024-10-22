import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function POST(request){
  var reqBody = await request.json()
  console.log(reqBody);
  try {
    await connectDB();
    await ItemModel.create(reqBody);
    return NextResponse.json({ message: "アイテムの作成" });
  } catch (error) {
    return NextResponse.json({message: "アイテム作成失敗"});
  }
}

