const mongoose = require("mongoose");

const InstallationSchema = new mongoose.Schema({
  locationId: String,
  companyId: String,
  status: {
    type: String,
    default: "active",
  },
}, { timestamps: true });

module.exports = mongoose.model("Installation", InstallationSchema);