import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB.");
  } catch (error) {
    console.log("MongoDb connection error occured:", error);
    process.exit(1);
  }
};

export default connectDb;
