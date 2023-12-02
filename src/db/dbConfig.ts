import { error } from "console";
import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to database");
    });
    connection.on("error", (err) => {
      process.exit(0);
    });
  } catch (err) {
    console.error("Error connecting to database");
  }
};

export { connectToDB };
