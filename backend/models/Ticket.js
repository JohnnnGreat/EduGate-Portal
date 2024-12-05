const mongoose = require("mongoose");

// Ticket Schema
const ticketSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      ticketId: {
         type: String,
         require: true,
         unique: true,
      },

      studentId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User", // Assuming you have a Student model
         required: true,
      },
      matricNumber: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         trim: true,
         lowercase: true,
         validate: {
            validator: function (v) {
               return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
         },
      },
      academicSession: {
         type: String,
         required: true,
         enum: ["2021/2022", "2022/2023", "2023/2024", "2024/2025"], // Example values
      },
      issueDescription: {
         type: String,
         required: true,
         minlength: 10,
      },
      fileUpload: {
         type: String, // This will store the file path
         required: false,
      },
      status: {
         type: String,
         enum: ["Pending", "In Progress", "Resolved"],
         default: "Pending",
      },
      createdAt: {
         type: Date,
         default: Date.now,
      },
   },
   {
      timestamps: true,
   },
);
const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
