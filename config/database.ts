import mongoose from "mongoose";

let connected = false;

const connectDb = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("Db connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
