import mongoose from "mongoose";
import configs from "#root/configs/index";

export default function connectDB() {
  mongoose.connect(configs.mongo.uri);
  const dbConnection = mongoose.connection;

  dbConnection.on("error", (e) => {
    console.log(`Error while connecting MONGO DB ${e}`);
  });

  dbConnection.on("connected", (e) => {
    console.log("MONGO DB connected!");
  });

  dbConnection.on("reconnected", (e) => {
    console.log("MONGO DB reconnected!");
  });

  dbConnection.on("close", (e) => {
    console.log("MONGO DB closed successfully!");
  });
  return dbConnection;
}
