const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   service: "Gmail",
   secure: true,
   auth: {
      user: "scholarhubbot@gmail.com", // Your email address
      pass: "vqrrtrkcnmdicsht", // Your email password or app-specific password
   },
});

module.exports = transporter;
