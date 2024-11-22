const jwt = require("jsonwebtoken");
const generateTokens = (user) => {
   const accessToken = jwt.sign(
      {
         userId: user._id,
         email: user.email,
         studentStatus: user.studentStatus,
         admissionNumber: user.admissionNumber,
      },
      "RANDOM",
      { expiresIn: "7d" },
   );

   // Generate refresh token
   const refreshToken = jwt.sign(
      {
         userId: user._id,
      },
      "RANDOM",
      { expiresIn: "7d" }, // Longer lived refresh token
   );

   return { accessToken, refreshToken };
};

module.exports = {
   generateTokens,
};
