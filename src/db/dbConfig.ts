import { error } from "console";
import mongoose, { ConnectOptions } from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
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
