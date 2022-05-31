const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String
    },
    img: {
      type: String,
    },
    city: {
      type: String
    },
    phone: {
      type: String
    },
    password: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports =  mongoose.model("User", UserSchema);
