import mongoose from "mongoose";
import "dotenv/config";
/**
 * TODO: Connect to MongoDB
 *
 * 1. Check if uri is provided (throw error if not: "MongoDB URI is required")
 * 2. Connect using mongoose.connect(uri)
 * 3. Return mongoose.connection
 */
export async function connectDB(uri) {
  // Your code here

  if (!uri) {
    throw new Error("MongoDB URI is required");
  }
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    const result = await mongoose.connect(uri);

    return result;
  } catch (error) {
    console.log("5. Error:", error.message);
    throw new Error("MongoDB URI is required");
  }
}
