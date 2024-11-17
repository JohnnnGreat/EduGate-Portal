const jwt = require("jsonwebtoken");
const generateTokens = (user) => {
   // Generate access token
   const accessToken = jwt.sign(
      {
         userId: user._id,
         email: user.email,
         studentStatus: user.studentStatus,
      },
      "RANDOM",
      { expiresIn: "15m" }, // Short lived access token
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
