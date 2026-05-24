const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  accessToken: String,
  refreshToken: String,
  expiresAt: Date,
  extras: {
    locationId: String,
    companyId: String,
    appId: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Token", TokenSchema);