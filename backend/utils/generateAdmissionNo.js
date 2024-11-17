const User = require("../models/User");

/**
 * Generates a unique admission number in the format number/EDG/year
 * @returns {Promise<string>} Admission number
 */
const generateAdmissionNumber = async () => {
   try {
      // Get the current year
      const currentYear = new Date().getFullYear();

      // Find the latest admission number for the current year
      const latestStudent = await User.findOne({
         admissionNumber: new RegExp(`.*\/EDG\/${currentYear}$`),
      }).sort({ admissionNumber: -1 });

      let nextNumber;

      if (latestStudent) {
         // Extract the number part and increment
         const currentNumber = parseInt(latestStudent.admissionNumber.split("/")[0]);
         nextNumber = currentNumber + 1;
      } else {
         // Start with 1001 if no existing students for this year
         nextNumber = 1001;
      }

      // Format: 1001/EDG/2024
      return `${nextNumber}/EDG/${currentYear}`;
   } catch (error) {
      throw new Error("Failed to generate admission number: " + error.message);
   }
};

module.exports = generateAdmissionNumber;
