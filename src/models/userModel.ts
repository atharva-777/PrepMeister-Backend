import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Enter a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  solved: {
    type: Array,
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const user = mongoose.models.users || mongoose.model("users", userSchema);

export default user;