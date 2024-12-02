const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin"); // Replace with the correct path to your model
const { generateAdminTokens } = require("../utils");

async function createAdmin() {
   try {
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email: "johndoe@gmail.com" });
      if (existingAdmin) {
         console.log("Admin already exists!");
         return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash("12345", 10);

      // Create a new admin
      const admin = new Admin({
         firstName: "John",
         lastName: "Doe",
         email: "johndoe@gmail.com",
         password: hashedPassword,
         role: "Management", // Assign role as needed
      });

      await admin.save();

      // const { accessToken, refreshToken } = generateAdminTokens(admin);

      // admin.refreshToken = refreshToken;
      // admin.lastLogin = new Date();

      // await admin.save();

      // return res.status(200).json({
      //    message: "Admin Logged In Successfuly",
      //    access: accessToken,
      //    refresh: refreshToken,
      //    admin: admin,
      // });

      console.log("Admin created successfully!");
   } catch (error) {
      console.error("Error creating admin:", error);
   }
}

async function loginAdminEmail(req, res) {
   console.log(req.body);
   try {
      const { email } = req.body;

      // Check if admin exists
      const admin = await Admin.findOne({ email });

      if (!admin) {
         return res.status(401).json({ message: "Invalid email or password" });
      }

      return res.status(200).json({
         message: "Email Found",
         email,
         success: true,
      });
   } catch (error) {
      console.error("Error logging in admin:", error);
      return res.status(500).json({ message: "Internal Server Error" });
   }
}

async function loginAdmin(req, res) {
   console.log(req.body);
   try {
      const { email, password } = req.body;

      // Check if admin exists
      const admin = await Admin.findOne({ email });

      console.log(admin);
      if (!admin) {
         return res.status(401).json({ message: "Invalid email or password" });
      }

      // Check if password is correct
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
         return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate tokens
      const { accessToken, refreshToken } = generateAdminTokens(admin);

      // Update admin's refresh token and last login
      admin.refreshToken = refreshToken;
      admin.lastLogin = new Date();
      await admin.save();

      return res.status(200).json({
         message: "Admin Logged In Successfuly",
         access: accessToken,
         refresh: refreshToken,
         admin: admin,
      });
   } catch (error) {
      console.error("Error logging in admin:", error);
      return res.status(500).json({ message: "Internal Server Error" });
   }
}

const getAdminInformation = async (req, res) => {
   try {
      const { email } = req.user; // Get the email address from the request parameters

      // Find the user by their email address
      const admin = await Admin.findOne({ email: email.toLowerCase() });

      // If user not found, send an error response
      if (!admin) {
         return res.status(404).json({
            type: "ADMIN_NOT_FOUND",
            message: "User not found. Please check the email address.",
         });
      }

      // Prepare user data for response (excluding sensitive information like password)

      // Return user data
      return res.status(200).json({
         message: "Admin information retrieved successfully",
         admin: admin,
      });
   } catch (error) {
      console.error("Get admin information error:", error);
      return res.status(500).json({
         type: "INTERNAL_SERVER_ERROR",
         message: "An error occurred while retrieving user information.",
         error: error.message,
      });
   }
};

module.exports = {
   createAdmin,
   loginAdmin,
   loginAdminEmail,
   getAdminInformation,
};
