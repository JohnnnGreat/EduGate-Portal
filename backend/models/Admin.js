const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
   {
      firstName: {
         type: String,
         required: true,
      },
      lastName: {
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

      profilePicture: {
         type: String, // URL to profile image
      },

      dateRegistered: {
         type: Date,
         default: Date.now,
      },
      lastLogin: {
         type: Date,
      },
      role: {
         type: String,
         enum: ["Lecturer", "ICT", "Management", "Student"],
         default: "Student",
      },
      lastPasswordChange: {
         type: Date,
      },
   },
   { timestamps: true },
);

module.exports = mongoose.model("Admin", AdminSchema);
