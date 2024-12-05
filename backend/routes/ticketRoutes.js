const express = require("express");
// const { checkIfAdmitted, registerNewStudent, loginUserDashboard, changePassword, getUserInformation } = require("../controllers/User");
const verifyToken = require("../middleware/authMiddleware");
const { createTicket, getUserTickets, trackTicket } = require("../controllers/Ticket");
const router = express.Router();

// Route to check if the user is admitted
router.post("/create-tickets", verifyToken, createTicket);
router.get("/my-tickets", verifyToken, getUserTickets);
router.get("/ticket/:ticketId", verifyToken, trackTicket);

// You can add other routes here, such as profile management, update password, etc.

module.exports = router;
