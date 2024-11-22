const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AcademicSchema = new Schema({
   student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   studentId: {
      type: String,
      required: true,
      unique: true,
   },
   matriculationNumber: {
      type: String,
      required: true,
      unique: true,
   },
   courseOfStudy: {
      type: String,
      required: true,
   },
   department: {
      type: String,
      required: true,
   },
   faculty: {
      type: String,
      required: true,
   },
   currentSemester: {
      type: String,
      required: true,
   },
   registeredCourses: [
      {
         courseCode: {
            type: String,
            required: true,
         },
         courseName: {
            type: String,
            required: true,
         },
         lecturer: {
            type: String,
            required: true,
         },
         credits: {
            type: Number,
            required: true,
         },
         schedule: {
            type: String,
            required: true,
         },
         venue: {
            type: String,
            required: true,
         },
      },
   ],
   examSchedule: [
      {
         courseCode: {
            type: String,
            required: true,
         },
         examDate: {
            type: Date,
            required: true,
         },
         examTime: {
            type: String,
            required: true,
         },
         venue: {
            type: String,
            required: true,
         },
      },
   ],
   semesterGPA: {
      type: Number,
      default: 0,
   },
   cumulativeGPA: {
      type: Number,
      default: 0,
   },
   semesterStatus: {
      type: String,
      default: "Active",
   },
   dateRegistered: {
      type: Date,
      default: Date.now,
   },
   lastUpdated: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("Academic", AcademicSchema);
