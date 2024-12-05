const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const admissionRoutes = require("./routes/applicationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const hostelRoutes = require("./routes/hostelRoutes");
const adminRoutes = require("./routes/adminRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const staffRoutes = require("./routes/staffRoutes");
const cors = require("cors");
const { createAdmin } = require("./controllers/Admin");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
   origin: ["http://localhost:3000", "http://localhost:5000"],
   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"],
   credentials: true,
   optionsSuccessStatus: 200,
};

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(cors(corsOptions));
app.use(express.json());

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/hostel", hostelRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/staff", staffRoutes);

createAdmin();

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
