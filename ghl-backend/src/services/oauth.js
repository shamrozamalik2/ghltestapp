const axios = require("axios");
const mongoose = require("mongoose"); // ✅ add this
const Token = require("../models/token");

const OAuthCallback = async (req) => {
  try {
    const { code } = req.query;

    if (!code) {
      return { success: false, message: "Missing code" };
    }

    const params = new URLSearchParams();
    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.REDIRECT_URI);
    // add this somewhere in your app startup
    console.log("🔌 MONGO_URI:", process.env.MONGO_URI);
    const tokenRes = await axios.post(
      "https://services.leadconnectorhq.com/oauth/token",
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const {
      access_token,
      refresh_token,
      expires_in,
      companyId,
      locationId,  // ✅ comes directly from GHL now
    } = tokenRes.data;

    if (!locationId) {
      return { success: false, message: "locationId missing from OAuth response" };
    }

    const expiresAt = new Date(Date.now() + expires_in * 1000);

    // ✅ save directly, no locations fetch needed
    const saved = await Token.findOneAndUpdate(
      { "extras.locationId": locationId },
      {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt,
        extras: {
          locationId,
          companyId,
          appId: process.env.CLIENT_ID, // static app ID
        },
      },
      { upsert: true, new: true }
    );

    console.log("💾 Token saved:", saved);        // is this printing?
    console.log("📦 DB:", mongoose.connection.name); // which DB is it saving to?

    return {
      success: true,
      message: "OAuth successful. Token saved.",
    };
  } catch (error) {
    console.log("❌ OAuth ERROR:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || error.message,
    };
  }
};

module.exports = { OAuthCallback };