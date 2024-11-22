const Admission = require("../models/Application");
const User = require("../models/User");

// 1. Create a New Admission
const createAdmission = async (req, res) => {
   try {
      const { phoneNumber, fullName, email, address, dateOfBirth } = req.body;

      const user = await User.findByIdAndUpdate(
         req.user.userId,
         {
            ...req.body,
         },
         { new: true, runValidators: true },
      );

      const existingAdmission = await Admission.find({ admissionNumber: user.admissionNumber });

      if (existingAdmission) {
         const updatedAdmission = await Admission.findByIdAndUpdate(
            existingAdmission[0]._id,
            {
               ...req.body,
            },
            { new: true, runValidators: true },
         );

         return res.status(200).json({
            message: "Admission Updated Successfully",
            data: user,
            admission: updatedAdmission,
         });
      }
      const admission = new Admission({
         user: req.user.userId,
         admissionNumber: user.admissionNumber,
      });

      await admission.save();

      return res.status(200).json({
         message: "Admission Created Successfully",
         data: user,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         message: "An Error Occured While Registering",
         type: "INTERNAL_SERVER_ERROR",
         error: error.message,
      });
   }
};

// 2. Get All Admissions
const getAllAdmissions = async (req, res) => {
   try {
      const getAllAdmissions = await Admission.find();
      console.log(getAllAddmissions);
   } catch (errors) {
      return res.status(500).json({
         message: "An Error Occured While Registering",
         type: "INTERNAL_SERVER_ERROR",
         error: error.message,
      });
   }
};

// 3. Get Admission by Admission Number
const getAdmissionByNumber = async (req, res) => {
   try {
      const existingAdmission = await Admission.findOne({
         admissionNumber: req.user.admissionNumber,
      });

      return res.status(200).json({
         message: "Admission information retrieved successfully",
         data: existingAdmission,
      });
   } catch (error) {
      return res.status(500).json({
         message: "An Error Occured While Registering",
         type: "INTERNAL_SERVER_ERROR",
         error: error.message,
      });
   }
};

// 4. Get Admission by User ID
const getAdmissionByUserId = async (req, res) => {};

// 5. Update Admission Information
const updateAdmission = async (req, res) => {
   const { academicSession, department, faculty, modeOfEntry, birthCertificate, oLevelResult } =
      req.body;
   try {
      const existingAdmission = await Admission.find({ admissionNumber: req.user.admissionNumber });

      const updatedAdmission = await Admission.findByIdAndUpdate(
         existingAdmission[0]._id,
         {
            academicSession,
            "program.faculty": faculty,
            "program.department": department,
            "program.level": modeOfEntry == "Direct Entry" ? "200" : "100",
            "program.modeOfEntry": modeOfEntry,
            "documents.birthCertificate": birthCertificate ?? "",
            "documents.oLevelResult": oLevelResult ?? "",
         },
         { new: true, runValidators: true },
      );
      return res.status(200).json({
         message: "Admission Updated Successfully",
         admission: updatedAdmission,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         message: "An Error Occured While Registering",
         type: "INTERNAL_SERVER_ERROR",
         error: error.message,
      });
   }
};

// 6. Delete Admission Record
const deleteAdmission = async (req, res) => {};

// 7. Confirm Admission
const confirmAdmission = async (req, res) => {};

// 8. Update Admission Status (e.g., from 'Provisional' to 'Admitted')
const updateAdmissionStatus = async (req, res) => {};

// 9. Upload/Update Admission Documents
const uploadDocuments = async (req, res) => {};

// 10. Get All Admissions by Status (e.g., 'Admitted', 'Provisional', 'Graduated')
const getAdmissionsByStatus = async (req, res) => {};

// 11. Search Admissions by Academic Session
const searchAdmissionsBySession = async (req, res) => {};

// 12. Get Admissions by Mode of Entry (e.g., 'UTME', 'Direct Entry')
const getAdmissionsByModeOfEntry = async (req, res) => {};

module.exports = {
   createAdmission,
   updateAdmission,
   getAllAdmissions,
   getAdmissionByNumber,
};
