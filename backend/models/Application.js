const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdmissionSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   admissionNumber: {
      type: String,
      required: true,
      unique: true,
   },
   academicSession: {
      type: String,
      required: true,
      // Example: "2023/2024"
   },
   program: {
      faculty: {
         type: String,
         required: true,
      },
      department: {
         type: String,
         required: true,
      },
      level: {
         type: String,
         required: true,
         // Example: "100 Level", "200 Level", etc.
      },
      modeOfEntry: {
         type: String,
         enum: ["UTME", "Direct Entry", "Transfer"],
         required: true,
      },
      courseDuration: {
         type: Number,
         required: true,
         // Number of years for the program (e.g., 4, 5, 6 years)
      },
   },
   status: {
      type: String,
      enum: ["Admitted", "Provisional", "Withdrawn", "Graduated", "Suspended"],
      default: "Provisional",
   },
   dateOfAdmission: {
      type: Date,
      required: true,
   },
   jambRegistrationNumber: {
      type: String,
      required: true,
      unique: true,
   },
   admissionType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Sandwich", "Distance Learning"],
      required: true,
   },
   isAdmissionConfirmed: {
      type: Boolean,
      default: false,
   },
   entryQualification: {
      oLevel: [
         {
            examType: {
               type: String,
               required: true,
               // Example: "WAEC", "NECO", "GCE"
            },
            examYear: {
               type: Number,
               required: true,
            },
            subjects: [
               {
                  subjectName: {
                     type: String,
                     required: true,
                  },
                  grade: {
                     type: String,
                     required: true,
                     // Example: "A1", "B2", "C4", etc.
                  },
               },
            ],
         },
      ],
      additionalQualifications: [
         {
            qualificationName: {
               type: String,
               // Example: "National Diploma", "Advanced Level"
            },
            institution: {
               type: String,
            },
            yearObtained: {
               type: Number,
            },
         },
      ],
   },
   documents: {
      birthCertificate: {
         type: String,
         // URL or path to the document
      },
      oLevelResult: {
         type: String,
         // URL or path to the document
      },
      jambResult: {
         type: String,
         // URL or path to the document
      },
      otherDocuments: [
         {
            documentName: String,
            documentURL: String,
         },
      ],
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
});

AdmissionSchema.pre("save", function (next) {
   this.updatedAt = Date.now();
   next();
});

const Admission = mongoose.model("Admission", AdmissionSchema);

module.exports = Admission;
