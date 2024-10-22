import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET(){
  try {
    await connectDB();
    const allItem = await ItemModel.find();
    return NextResponse.json({
      message: "アイテムの読み取り成功（オール）",
      allItems: allItem
    });
  } catch {
    return NextResponse.json({message: "アイテムの読み取り失敗（オール）"});
  }  
}

export const revalidate = 0;