const transporter = require("../config/nodemailer");

const sendNotification = async (email, admissionNumber, password) => {
   try {
      const mailOptions = {
         from: `"Education Portal" <${process.env.SMTP_USER}>`,
         to: email,
         subject: "Welcome to Our Institution - Your Login Credentials",
         html: `
                <h2>Welcome to Our Institution!</h2>
                <p>Your registration has been successful. Below are your login credentials:</p>
                <p><strong>Admission Number:</strong> ${admissionNumber}</p>
                <p><strong>Password:</strong> ${password}</p>
                <p><strong>Email:</strong> ${email}</p>
                <br>
                <p>Please change your password upon your first login for security purposes.</p>
                <p>You can login at: <a href="${process.env.PORTAL_URL}">${process.env.PORTAL_URL}</a></p>
                <br>
                <p>Best regards,</p>
                <p>The Education Team</p>
            `,
      };

      const info = await transporter.sendMail(mailOptions);
      return {
         success: true,
         messageId: info.messageId,
      };
   } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error("Failed to send login credentials email");
   }
};

// Email notification for password change
const sendPasswordChangeNotification = async (email, firstName) => {
   try {
      const mailOptions = {
         from: `"EduGate Portal Security" <${process.env.SMTP_USER}>`,
         to: email,
         subject: "Password Change Notification",
         html: `
                <h2>Password Change Notification</h2>
                <p>Dear ${firstName},</p>
                <p>This email is to confirm that your password was successfully changed on your Education Portal account.</p>
                <p>If you did not make this change, please:</p>
                <ol>
                    <li>Contact our support team immediately at ${process.env.SUPPORT_EMAIL}</li>
                    <li>Change your password immediately by visiting ${process.env.PORTAL_URL}/reset-password</li>
                    <li>Review your recent account activity</li>
                </ol>
                <p>For security reasons, you may need to log in again on all your devices.</p>
                <br>
                <p>Best regards,</p>
                <p>The Education Portal Security Team</p>
            `,
      };

      const info = await transporter.sendMail(mailOptions);
      return {
         success: true,
         messageId: info.messageId,
      };
   } catch (error) {
      console.error("Failed to send password change notification:", error);
      throw new Error("Failed to send password change notification email");
   }
};

const forgottenPassword = async (email, resetToken) => {
   try {
      const mailOptions = {
         from: `"Education Portal Support" <${process.env.SMTP_USER}>`,
         to: email,
         subject: "Password Reset Request",
         html: `
                <h2>Password Reset Request</h2>
                <p>We received a request to reset the password for your account associated with this email address.</p>
                <p>If you made this request, please click the link below to reset your password:</p>
                <p><a href="${process.env.PORTAL_URL}/reset-password?token=${resetToken}">Reset Password</a></p>
                <br>
                <p>If you did not request a password reset, please ignore this email or contact our support team at ${process.env.SUPPORT_EMAIL} if you have concerns.</p>
                <br>
                <p>For your security, the link will expire in 24 hours.</p>
                <p>Best regards,</p>
                <p>The Education Portal Support Team</p>
            `,
      };

      const info = await transporter.sendMail(mailOptions);
      return {
         success: true,
         messageId: info.messageId,
      };
   } catch (error) {
      console.error("Failed to send forgotten password email:", error);
      throw new Error("Failed to send forgotten password email");
   }
};

module.exports = { sendNotification, sendPasswordChangeNotification, forgottenPassword };
