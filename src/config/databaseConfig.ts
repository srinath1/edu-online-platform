import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("Mongodb Connected");
  } catch (error) {
    console.log("Error", error);
  }
};
