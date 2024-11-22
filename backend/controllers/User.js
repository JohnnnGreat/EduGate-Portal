const User = require("../models/User");
const Academic = require("../models/Academics");
const generateAdmissionNumber = require("../utils/generateAdmissionNo");
const generatePassword = require("../utils/generatePassword");
const bcrypt = require("bcryptjs");
const sendNotification = require("../utils/pushNotifications");
const { generateTokens } = require("../utils");

// Controller function to check if a user is admitted
const checkIfAdmitted = async (req, res) => {
   const { email } = req.body; // Get the email address from the request body
   console.log(email);
   try {
      // Find the user by their email address
      const user = await User.findOne({ email: email });

      // If user not found, send an error response
      if (!user) {
         return res.status(404).json({
            type: "USER_NOT_FOUND",
            message: "User not found. Please check the email address.",
         });
      }

      // Check the user's student status
      if (user.studentStatus === "Admitted") {
         // Fetch academic details to display additional info
         const academicDetails = await Academic.findOne({ student: user._id });
         if (!academicDetails) {
            return res.status(404).json({
               message: "Academic details not found for the user.",
               type: "ACADEMIC_NOT_FOUND",
            });
         }

         // Respond with the admission status and academic details
         return res.status(200).json({
            message: "User is admitted.",
            studentId: academicDetails.studentId,
            matriculationNumber: academicDetails.matriculationNumber,
            courseOfStudy: academicDetails.courseOfStudy,
            department: academicDetails.department,
            currentSemester: academicDetails.currentSemester,
            registeredCourses: academicDetails.registeredCourses,
         });
      } else {
         // If the student is not admitted, send a message
         return res.status(200).json({
            message: "User has not been admitted yet. Please check back later.",
         });
      }
   } catch (error) {
      // Handle errors (e.g., database connection issues)

      return res.status(500).json({
         message: "An error occurred while checking the admission status.",
         error: error.message,
      });
   }
};

const registerNewStudent = async (req, res) => {
   console.log(req.body);
   try {
      const userInformationPayload = req.body;

      // Check is User Aready Registered

      const user = await User.find({ email: userInformationPayload.email });
      console.log(user);

      if (user.length > 0) {
         return res.status(404).json({
            type: "RESOURCE_ALREADY_REGISTERED",
            message: "User is already registered",
         });
      }

      // Generate Password, and admissionNumber
      const password = generatePassword();
      const admissionNumber = await generateAdmissionNumber();

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user object with hashed password
      const newUser = new User({
         ...userInformationPayload,
         password: hashedPassword,
         admissionNumber: admissionNumber,
         studentStatus: "Pending",
      });

      // Save the user
      await newUser.save();

      // Send notification email with plain password
      await sendNotification(userInformationPayload.email, admissionNumber, password);

      // Return success response (don't include password in response)
      return res.status(201).json({
         message: "Student registered successfully",
         data: {
            admissionNumber,
            email: userInformationPayload.email,
            studentStatus: "Pending",
         },
      });
   } catch (error) {
      return res.status(500).json({
         message: "An Error Occured While Registering",
         type: "INTERNAL_SERVER_ERROR",
         error: error.message,
      });
   }
};

const loginUserDashboard = async (req, res) => {
   try {
      const { email, password } = req.body;

      // Validate request body
      if (!email || !password) {
         return res.status(400).json({
            type: "MISSING_FIELDS",
            message: "Email and password are required",
         });
      }

      // Find the user by their email address
      const user = await User.findOne({ email: email.toLowerCase() });

      // If user not found, send an error response
      if (!user) {
         return res.status(404).json({
            type: "USER_NOT_FOUND",
            message: "User not found. Please check the email address.",
         });
      }

      // Check if user is suspended
      if (user.studentStatus === "Suspended") {
         return res.status(403).json({
            type: "ACCOUNT_SUSPENDED",
            message: "Your account has been suspended. Please contact administration.",
         });
      }

      // Compare Password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
         return res.status(401).json({
            type: "INVALID_CREDENTIALS",
            message: "Invalid password. Please try again.",
         });
      }

      // Generate both tokens
      const { accessToken, refreshToken } = generateTokens(user);

      user.refreshToken = refreshToken;
      user.lastLogin = new Date();
      await user.save();

      // Set refresh token in HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Prepare user data for response (excluding sensitive information)
      const userData = {
         _id: user._id,
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         studentStatus: user.studentStatus,
         profilePicture: user.profilePicture,
         dateRegistered: user.dateRegistered,
         lastLogin: user.lastLogin,
      };

      // Return success response with token and user data
      return res.status(200).json({
         message: "Login successful",
         access: accessToken,
         refresh: refreshToken,
         user: userData,
      });
   } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
         type: "INTERNAL_SERVER_ERROR",
         message: "An error occurred while processing your login request.",
         error: error.message,
      });
   }
};

const changePassword = async (req, res) => {
   try {
      const { email, currentPassword, newPassword } = req.body;

      // Validate request body
      if (!email || !currentPassword || !newPassword) {
         return res.status(400).json({
            errorType: "MISSING_FIELDS",
            message: "Email, current password, and new password are required",
         });
      }

      // Password strength validation
      const passwordRegex = /^.{6,}$/;

      if (!passwordRegex.test(newPassword)) {
         return res.status(400).json({
            errorType: "INVALID_PASSWORD_FORMAT",
            message:
               "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number, and one special character",
         });
      }

      // Check if current password and new password are the same
      if (currentPassword === newPassword) {
         return res.status(400).json({
            errorType: "SAME_PASSWORD",
            message: "New password must be different from current password",
         });
      }

      // Find the user
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
         return res.status(404).json({
            errorType: "USER_NOT_FOUND",
            message: "User not found. Please check the email address.",
         });
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
         return res.status(401).json({
            errorType: "INVALID_CURRENT_PASSWORD",
            message: "Current password is incorrect",
         });
      }

      // Hash new password
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      user.password = hashedNewPassword;
      user.lastPasswordChange = new Date();

      // If you're using refresh tokens, you might want to clear them to force re-login
      if (user.refreshToken) {
         user.refreshToken = undefined;
      }

      await user.save();

      // Send notification email
      await sendNotification.sendPasswordChangeNotification(user.email, user.firstName);

      // Return success response
      return res.status(200).json({
         message: "Password changed successfully. Please log in with your new password.",
         lastPasswordChange: user.lastPasswordChange,
      });
   } catch (error) {
      console.error("Password change error:", error);

      // Handle specific errors
      if (error.message.includes("Failed to send password change notification")) {
         return res.status(500).json({
            errorType: "NOTIFICATION_FAILED",
            message:
               "Password was changed but we couldn't send the confirmation email. Please check your email settings.",
            timestamp: new Date(),
         });
      }

      return res.status(500).json({
         errorType: "INTERNAL_SERVER_ERROR",
         message: "An error occurred while changing your password.",
         error: error.message,
      });
   }
};

const forgottenPassword = (req, res) => {};

// Controller function to get user information by email
const getUserInformation = async (req, res) => {
   try {
      const { email } = req.user; // Get the email address from the request parameters

      // Find the user by their email address
      const user = await User.findOne({ email: email.toLowerCase() });

      // If user not found, send an error response
      if (!user) {
         return res.status(404).json({
            type: "USER_NOT_FOUND",
            message: "User not found. Please check the email address.",
         });
      }

      // Prepare user data for response (excluding sensitive information like password)

      // Return user data
      return res.status(200).json({
         message: "User information retrieved successfully",
         data: user,
      });
   } catch (error) {
      console.error("Get user information error:", error);
      return res.status(500).json({
         type: "INTERNAL_SERVER_ERROR",
         message: "An error occurred while retrieving user information.",
         error: error.message,
      });
   }
};

module.exports = {
   checkIfAdmitted,
   registerNewStudent,
   loginUserDashboard,
   changePassword,
   getUserInformation,
};
