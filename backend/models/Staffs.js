const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
   {
      personalInfo: {
         firstName: { type: String, required: true },
         lastName: { type: String, required: true },
         gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
         dateOfBirth: { type: Date, required: true },
         photo: { type: String }, // URL or file path for profile picture
      },
      contactInfo: {
         email: { type: String, required: true, unique: true },
         phone: { type: String, required: true },
         address: { type: String, required: true },
         emergencyContact: {
            name: { type: String },
            phone: { type: String },
            relationship: { type: String },
         },
      },
      employmentDetails: {
         employeeID: { type: String, required: true, unique: true },
         department: { type: String, required: true },
         designation: { type: String, required: true },
         employmentType: {
            type: String,
            enum: ["Full-Time", "Part-Time", "Contract"],
            required: true,
         },
         dateOfHire: { type: Date, required: true },
         status: {
            type: String,
            enum: ["Active", "Inactive", "On Leave", "Retired"],
            default: "Active",
         },
      },
      academicAndProfessional: {
         qualifications: [{ type: String }], // Array of qualifications
         certifications: [{ type: String }], // Array of certifications
         previousExperience: [{ type: String }], // Array of experiences
      },
      attendanceAndLeave: {
         attendanceRecords: [
            {
               date: { type: Date },
               status: { type: String, enum: ["Present", "Absent", "Late"] },
            },
         ],
         leaveRequests: [
            {
               startDate: { type: Date },
               endDate: { type: Date },
               reason: { type: String },
               status: { type: String, enum: ["Pending", "Approved", "Rejected"] },
            },
         ],
      },
      performance: {
         evaluations: [
            {
               date: { type: Date },
               evaluator: { type: String },
               comments: { type: String },
               score: { type: Number, min: 0, max: 100 },
            },
         ],
         commendations: [{ type: String }], // Array of commendations
         warnings: [{ type: String }], // Array of warnings
      },
      exitDetails: {
         isRetired: { type: Boolean, default: false },
         exitDate: { type: Date },
         clearanceCompleted: { type: Boolean, default: false },
      },
   },
   { timestamps: true },
); // Adds createdAt and updatedAt timestamps

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
