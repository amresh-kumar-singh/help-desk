import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  currentIndex: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Settings", settingSchema);
