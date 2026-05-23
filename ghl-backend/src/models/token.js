const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  locationId: String,
  companyId: String,

  accessToken: String,
  refreshToken: String,

  expiresAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("Token", TokenSchema);