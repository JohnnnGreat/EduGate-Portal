/**
 * Generates a random 16-character password containing letters, numbers and special characters
 * @returns {string} 16-character password
 */

const generatePassword = () => {
   const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   const lowercase = "abcdefghijklmnopqrstuvwxyz";
   const numbers = "0123456789";
   const specialChars = "!@#$%^&*";
   const allChars = uppercase + lowercase + numbers + specialChars;

   let password = "";

   // Ensure at least one of each type
   password += uppercase[Math.floor(Math.random() * uppercase.length)];
   password += lowercase[Math.floor(Math.random() * lowercase.length)];
   password += numbers[Math.floor(Math.random() * numbers.length)];
   password += specialChars[Math.floor(Math.random() * specialChars.length)];

   // Fill the rest randomly
   for (let i = password.length; i < 16; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
   }

   // Shuffle the password
   return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
};

module.exports = generatePassword;
