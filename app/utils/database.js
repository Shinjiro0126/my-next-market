import mongoose from "mongoose";

const connectDB = async() => {
  try {
    await mongoose.connect("mongodb+srv://shinji:Shinji990126@cluster0.xsbmj.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Success: Connected to MongoDB")
  } catch {
    console.log("Failure: Unconnected to MongoDB")
    throw new Error()
  }
}

export default connectDB