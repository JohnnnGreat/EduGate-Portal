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
   },

   matNumber: {
      type: String,
   },
   academicSession: {
      type: String,
   },
   program: {
      faculty: {
         type: String,
      },
      department: {
         type: String,
      },
      level: {
         type: String,
         // Example: "100 Level", "200 Level", etc.
      },
      modeOfEntry: {
         type: String,
         enum: ["UTME", "Direct Entry", "Transfer"],
      },
      courseDuration: {
         type: Number,
         // Number of years for the program (e.g., 4, 5, 6 years)
      },
   },
   semesterInformationUpdated: {
      type: Boolean,
      default: false,
   },
   status: {
      type: String,
      enum: ["Admitted", "Not Admitted", "Withdrawn", "Graduated", "Suspended"],
      default: "Not Admitted",
   },
   dateOfAdmission: {
      type: Date,
   },
   jambRegistrationNumber: {
      type: String,
      unique: true,
   },
   admissionType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Sandwich", "Distance Learning"],
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
               // Example: "WAEC", "NECO", "GCE"
            },
            examYear: {
               type: Number,
            },
            subjects: [
               {
                  subjectName: {
                     type: String,
                  },
                  grade: {
                     type: String,
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
   // Next of Kin Information
   nextOfKin: {
      name: {
         type: String,
         required: true,
      },
      relationship: {
         type: String,
         required: true,
         // Example: "Father", "Mother", "Guardian", etc.
      },
      phone: {
         type: String,
         required: true,
      },
      email: {
         type: String,
      },
      address: {
         type: String,
      },
   },

   currentAcademicInformation: {
      semester: {
         type: String,
         enum: ["First Semester", "Second Semester"],
      },
      startDate: {
         type: Date,
      },
      endDate: {
         type: Date,
      },
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   updatedAt: {
      type: Date,
      default: Date.now,
   },
   submitted: {
      type: Boolean,
      default: false,
   },
   fileUrl: {
      type: String,
   },
   regNumber: {
      type: String,
   },
});

AdmissionSchema.pre("save", function (next) {
   this.updatedAt = Date.now();
   next();
});

const Admission = mongoose.model("Admission", AdmissionSchema);

module.exports = Admission;
