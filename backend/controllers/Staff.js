const Staff = require("../models/Staff");

// Create new staff member
exports.createStaff = async (req, res) => {
   try {
      const newStaff = new Staff(req.body);
      const savedStaff = await newStaff.save();
      res.status(201).json({
         message: "Staff member created successfully",
         staff: savedStaff,
      });
   } catch (error) {
      res.status(400).json({
         message: "Error creating staff member",
         error: error.message,
      });
   }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
   try {
      const { page = 1, limit = 10 } = req.query;
      const staffMembers = await Staff.find()
         .limit(limit * 1)
         .skip((page - 1) * limit)
         .select("-performance.evaluations -attendanceAndLeave");

      const totalStaff = await Staff.countDocuments();

      res.status(200).json({
         totalStaff,
         totalPages: Math.ceil(totalStaff / limit),
         currentPage: page,
         staffMembers,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error retrieving staff members",
         error: error.message,
      });
   }
};

// Get staff member by ID
exports.getStaffById = async (req, res) => {
   try {
      const staff = await Staff.findById(req.params.id);
      if (!staff) {
         return res.status(404).json({ message: "Staff member not found" });
      }
      res.status(200).json(staff);
   } catch (error) {
      res.status(500).json({
         message: "Error retrieving staff member",
         error: error.message,
      });
   }
};

// Update staff member
exports.updateStaff = async (req, res) => {
   try {
      const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

      if (!updatedStaff) {
         return res.status(404).json({ message: "Staff member not found" });
      }

      res.status(200).json({
         message: "Staff member updated successfully",
         staff: updatedStaff,
      });
   } catch (error) {
      res.status(400).json({
         message: "Error updating staff member",
         error: error.message,
      });
   }
};

// Delete staff member
exports.deleteStaff = async (req, res) => {
   try {
      const deletedStaff = await Staff.findByIdAndDelete(req.params.id);

      if (!deletedStaff) {
         return res.status(404).json({ message: "Staff member not found" });
      }

      res.status(200).json({
         message: "Staff member deleted successfully",
         staff: deletedStaff,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error deleting staff member",
         error: error.message,
      });
   }
};

// Add attendance record
exports.addAttendanceRecord = async (req, res) => {
   try {
      const staff = await Staff.findById(req.params.id);
      if (!staff) {
         return res.status(404).json({ message: "Staff member not found" });
      }

      staff.attendanceAndLeave.attendanceRecords.push(req.body);
      await staff.save();

      res.status(200).json({
         message: "Attendance record added successfully",
         staff,
      });
   } catch (error) {
      res.status(400).json({
         message: "Error adding attendance record",
         error: error.message,
      });
   }
};

// Submit leave request
exports.submitLeaveRequest = async (req, res) => {
   try {
      const staff = await Staff.findById(req.params.id);
      if (!staff) {
         return res.status(404).json({ message: "Staff member not found" });
      }

      staff.attendanceAndLeave.leaveRequests.push(req.body);
      await staff.save();

      res.status(200).json({
         message: "Leave request submitted successfully",
         staff,
      });
   } catch (error) {
      res.status(400).json({
         message: "Error submitting leave request",
         error: error.message,
      });
   }
};

// Add performance evaluation
exports.addPerformanceEvaluation = async (req, res) => {
   try {
      const staff = await Staff.findById(req.params.id);
      if (!staff) {
         return res.status(404).json({ message: "Staff member not found" });
      }

      staff.performance.evaluations.push(req.body);
      await staff.save();

      res.status(200).json({
         message: "Performance evaluation added successfully",
         staff,
      });
   } catch (error) {
      res.status(400).json({
         message: "Error adding performance evaluation",
         error: error.message,
      });
   }
};

// Search staff members
exports.searchStaff = async (req, res) => {
   try {
      const { name, department, employmentType, status } = req.query;

      const query = {};

      if (name) {
         query.$or = [{ "personalInfo.firstName": { $regex: name, $options: "i" } }, { "personalInfo.lastName": { $regex: name, $options: "i" } }];
      }

      if (department) {
         query["employmentDetails.department"] = { $regex: department, $options: "i" };
      }

      if (employmentType) {
         query["employmentDetails.employmentType"] = employmentType;
      }

      if (status) {
         query["employmentDetails.status"] = status;
      }

      const staffMembers = await Staff.find(query);

      res.status(200).json({
         totalResults: staffMembers.length,
         staffMembers,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error searching staff members",
         error: error.message,
      });
   }
};
