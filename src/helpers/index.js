const crypto = require("crypto");
const SECRET = "my-secret-key";

const random = () => crypto.randomBytes(128).toString("base64");
const authentication = (salt, password) => {
  if (salt === null || password === null) {
    return null;
  }
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

const isValidEmail = (email) => {
  // Regular expression for a valid email format
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  // Test the email against the regex pattern
  return emailRegex.test(email);
};

const isValidUsername = (username) => {
  // Define criteria for a valid username
  const minLength = 3; // Minimum length
  const maxLength = 20; // Maximum length
  const allowedCharactersRegex = /^[a-zA-Z0-9_]+$/; // Allowed characters (alphanumeric and underscore)

  // Check the length
  if (username.length < minLength || username.length > maxLength) {
    return false; // Username length is not within the allowed range
  }

  // Check allowed characters using regex
  if (!allowedCharactersRegex.test(username)) {
    return false; // Username contains disallowed characters
  }

  // All checks passed, username is valid
  return true;
};

const isValidPassword = (password) => {
  // Define criteria for a valid password
  const minLength = 4; // Minimum length
  const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
  const hasLowercase = /[a-z]/.test(password); // At least one lowercase letter
  const hasNumber = /[0-9]/.test(password); // At least one digit

  // Check minimum length
  if (password.length < minLength) {
    return false; // Password is too short
  }

  // Check character type requirements
  if (!(hasUppercase && hasLowercase && hasNumber)) {
    return false; // Password doesn't meet character type requirements
  }

  // All checks passed, password is valid
  return true;
};

module.exports = {
  authentication,
  random,
  isValidEmail,
  isValidUsername,
  isValidPassword,
};
