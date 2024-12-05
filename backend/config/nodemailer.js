const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   service: "Gmail",
   secure: true,
   auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
   },
});

module.exports = transporter;
