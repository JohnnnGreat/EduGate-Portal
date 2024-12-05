const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { generateAdminTokens } = require("../utils");

async function createAdmin() {
   try {
      const existingAdmin = await Admin.findOne({ email: "johndoe@gmail.com" });
      if (existingAdmin) {
         console.log("Admin already exists!");
         return;
      }

      const hashedPassword = await bcrypt.hash("12345", 10);

      const admin = new Admin({
         firstName: "John",
         lastName: "Doe",
         email: "johndoe@gmail.com",
         password: hashedPassword,
         role: "Management",
      });

      await admin.save();
      console.log("Admin created successfully!");
   } catch (error) {
      console.error("Error creating admin:", error);
   }
}

async function loginAdminEmail(req, res) {
   try {
      const { email } = req.body;
      const admin = await Admin.findOne({ email });

      if (!admin) {
         return res.status(401).json({
            message: "Invalid email or password",
            success: false,
         });
      }

      return res.status(200).json({
         message: "Email Found",
         email,
         success: true,
      });
   } catch (error) {
      console.error("Error logging in admin:", error);
      return res.status(500).json({
         message: "Internal Server Error",
         success: false,
      });
   }
}

async function loginAdmin(req, res) {
   try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });

      if (!admin) {
         return res.status(401).json({
            message: "Invalid email or password",
            success: false,
         });
      }

      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
         return res.status(401).json({
            message: "Invalid email or password",
            success: false,
         });
      }

      const { accessToken, refreshToken } = generateAdminTokens(admin);

      admin.refreshToken = refreshToken;
      admin.lastLogin = new Date();
      await admin.save();

      return res.status(200).json({
         message: "Admin Logged In Successfully",
         access: accessToken,
         refresh: refreshToken,
         admin: admin,
         success: true,
      });
   } catch (error) {
      console.error("Error logging in admin:", error);
      return res.status(500).json({
         message: "Internal Server Error",
         success: false,
      });
   }
}

const getAdminInformation = async (req, res) => {
   try {
      const { email } = req.user;
      const admin = await Admin.findOne({ email: email.toLowerCase() });

      if (!admin) {
         return res.status(404).json({
            type: "ADMIN_NOT_FOUND",
            message: "User not found. Please check the email address.",
            success: false,
         });
      }

      return res.status(200).json({
         message: "Admin information retrieved successfully",
         admin: admin,
         success: true,
      });
   } catch (error) {
      console.error("Get admin information error:", error);
      return res.status(500).json({
         type: "INTERNAL_SERVER_ERROR",
         message: "An error occurred while retrieving user information.",
         error: error.message,
         success: false,
      });
   }
};

module.exports = {
   createAdmin,
   loginAdmin,
   loginAdminEmail,
   getAdminInformation,
};
