import mongoose from "mongoose";
import isValidEmail from "#root/utils/isValidEmail";
import isValidPhone from "#root/utils/isValidPhone";

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a Name!"],
  },
  email: {
    type: String,
    unique: [true, "Email Address is already in use!"],
    lowercase: true,
    required: [true, "Please Enter an Email"],
    validate: [isValidEmail, "Please Enter a valid Email!"],
  },
  phone: {
    type: String,
    unique: [true, "Phone number is already in use!"],
    required: [true, "Please Enter a Phone Number!"],
    validate: [isValidPhone, "Please Enter a valid phone!"],
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    // Considering new user will be active
    default: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// In case user is marked inactive and user indexed before current index the we have to decrease current index by one
// agentSchema.pre('updateOne',(next) => {

// })

export default mongoose.model("Agents", agentSchema);
