// filepath: /Users/ramjigupta/Desktop/No-Code-Platform/backend/middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An unexpected error occurred" });
};