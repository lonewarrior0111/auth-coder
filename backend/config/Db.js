import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Sucessfully connected to MongoDB!!! ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection failed!!! ${error.message}`);
  }
};

export default connectDB;
