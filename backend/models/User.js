const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
   {
      firstName: {
         type: String,
         required: true,
      },
      lastName: {
         type: String,
         required: true,
      },
      admissionNumber: {
         type: String,
         required: true,
      },

      refreshToken: {
         type: String,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         match: [/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/, "Please fill a valid email address"],
      },
      password: {
         type: String,
         required: true,
      },
      phoneNumber: {
         type: String,
         required: true,
      },
      dateOfBirth: {
         type: Date,
         required: true,
      },
      gender: {
         type: String,
         enum: ["Male", "Female", "Other"],
         required: true,
      },
      address: {
         type: String,
      },
      profilePicture: {
         type: String, // URL to profile image
      },
      studentStatus: {
         type: String,
         enum: ["Pending", "Admitted", "Graduated", "Suspended"],
         default: "Pending",
      },
      dateRegistered: {
         type: Date,
         default: Date.now,
      },
      lastLogin: {
         type: Date,
      },
      lastPasswordChange: {
         type: Date,
      },
   },
   { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
