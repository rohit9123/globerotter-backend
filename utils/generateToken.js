const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  // Ensure JWT_SECRET and JWT_EXPIRES are defined
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES) {
    throw new Error("JWT_SECRET or JWT_EXPIRES is not set in environment variables");
  }

  // Generate token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES, // Ensure format is correct (e.g., "7d", "24h", "3600s")
  });

  // Set token in HTTP-Only cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JS access (security feature)
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "Lax", // Lax is more user-friendly while preventing CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

  return token; // Optionally return token for response (if needed)
};

module.exports = { generateToken };
