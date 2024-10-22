import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(request, context){
  const reqBody = await request.json();
  try {
    await connectDB()
    const singleItem = await ItemModel.findById(context.params.id)

    if (singleItem.email === reqBody.emai) {
      await ItemModel.updateOne({ _id: context.params.id }, reqBody)
      return NextResponse.json({ message: "編集成功" })
    } else {
      return NextResponse.json({ message: "編集失敗：他の人が作成したアイテム" })
    }

    
  } catch {
    return NextResponse.json({message: "編集失敗"})  
  }
}