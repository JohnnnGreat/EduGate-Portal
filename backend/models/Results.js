const mongoose = require("mongoose");

// Define the schema for each individual course result
const courseResultSchema = new mongoose.Schema({
   courseCode: {
      type: String,
      required: true,
      trim: true,
   },
   courseTitle: {
      type: String,
      required: true,
      trim: true,
   },
   units: {
      type: Number,
      required: true,
      min: 0, // Ensure course units are a positive number
   },
   score: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // Ensures the score is within a typical 0-100 range
   },
   grade: {
      type: String,
      required: true,
      trim: true,
      enum: ["A", "B", "C", "D", "F"], // Ensure only valid grades are entered
   },
   gradePoint: {
      type: Number,
      required: true,
      min: 0,
      max: 4.0, // Assuming the maximum grade point is 4.0
   },
   remarks: {
      type: String,
      default: "Passed", // Default remark if none is provided
      trim: true,
   },
});

// Define the main schema for student results
const studentResultSchema = new mongoose.Schema({
   studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Assuming there's a separate Student schema
      required: true,
   },
   fullName: {
      type: String,
      required: true,
      trim: true,
   },
   registrationNumber: {
      type: String,
      required: true,
      unique: true, // Ensure registration number is unique for each student
      trim: true,
   },
   academicSession: {
      type: String,
      required: true,
      trim: true, // e.g., "2023/2024"
   },
   semester: {
      type: String,
      required: true,
      enum: ["First Semester", "Second Semester"], // Ensure only valid semesters are used
      trim: true,
   },
   courses: [courseResultSchema], // Array of course results using the sub-schema
   gpa: {
      type: Number,
      required: true,
      min: 0,
      max: 4.0, // GPA should be within 0.0 - 4.0
   },
   cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 4.0, // CGPA should be within 0.0 - 4.0
   },
   transcriptRequested: {
      type: Boolean,
      default: false, // Tracks if a student has requested a transcript
   },
   dateCreated: {
      type: Date,
      default: Date.now, // Timestamp for when the result entry was created
   },
   lastUpdated: {
      type: Date,
      default: Date.now, // Timestamp for when the result entry was last updated
   },
});

// Pre-save middleware to automatically update `lastUpdated` timestamp
studentResultSchema.pre("save", function (next) {
   this.lastUpdated = Date.now();
   next();
});

// Create and export the model
const StudentResult = mongoose.model("StudentResult", studentResultSchema);

module.exports = StudentResult;
