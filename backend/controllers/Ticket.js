const Ticket = require("../models/Ticket");

// Create a New Ticket
const { v4: uuidv4 } = require("uuid");

exports.createTicket = async (req, res) => {
   try {
      const { name, matricNumber, email, academicSession, issueDescription, file } = req.body;

      const ticket = new Ticket({
         name,
         studentId: req.user.userId,
         matricNumber,
         email,
         academicSession,
         issueDescription: issueDescription ?? "No Description Attached",
         fileUpload: file,
         ticketId: `TICKET-${uuidv4()}`, // Generates a completely unique identifier
      });

      await ticket.save();
      res.status(201).json({
         message: "Ticket created successfully",
         ticket,
         uniqueTicketId: ticket.ticketId,
      });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

// Get All Tickets
exports.getAllTickets = async (req, res) => {
   try {
      const tickets = await Ticket.find();
      res.status(200).json(tickets);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

exports.getUserTickets = async (req, res) => {
   console.log("user", req.user);
   try {
      const userId = req.user.userId;

      const tickets = await Ticket.find({
         studentId: userId,
      }).sort({ createdAt: -1 }); // Sort by most recent first

      res.status(200).json({
         message: "User tickets retrieved successfully",
         tickets: tickets,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error retrieving tickets",
         error: error.message,
      });
   }
};

exports.trackTicket = async (req, res) => {
   try {
      const ticketId = req.params.ticketId;
      const ticket = await Ticket.findOne({ ticketId });
      if (!ticket) {
         return res.status(404).json({ error: "Ticket not found" });
      }
      res.status(200).json({ message: "Ticket tracked successfully", ticket });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// Update Ticket Status
exports.updateTicketStatus = async (req, res) => {
   try {
      const { status } = req.body;
      const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!ticket) {
         return res.status(404).json({ error: "Ticket not found" });
      }
      res.status(200).json({ message: "Ticket status updated", ticket });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// Delete a Ticket
exports.deleteTicket = async (req, res) => {
   try {
      const ticket = await Ticket.findByIdAndDelete(req.params.id);
      if (!ticket) {
         return res.status(404).json({ error: "Ticket not found" });
      }
      res.status(200).json({ message: "Ticket deleted successfully" });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};
