const mongoose = require("mongoose");

const ghlSchema = new mongoose.Schema({

  locationId: {
    type: String,
    required: true
  },

  companyId: {
    type: String
  },

  accessToken: {
    type: String,
    required: true
  },

  refreshToken: {
    type: String,
    required: true
  },

  expiresAt: {
    type: Date
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "GHLUser",
  ghlSchema
);