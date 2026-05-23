const axios = require("axios");
const Token = require("../models/token");

const OAuthCallback = async (req) => {
  try {
    const { code, locationId, companyId } = req.query;

    console.log("👉 OAuth Callback Hit");
    console.log("CODE:", code);
    console.log("LOCATION:", locationId);
    console.log("COMPANY:", companyId);

    if (!code) {
      return { success: false, message: "Missing code" };
    }

    const response = await axios.post(
      "https://services.leadconnectorhq.com/oauth/token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.REDIRECT_URI,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("✅ TOKEN RESPONSE:", response.data);

    const { access_token, refresh_token, expires_in } = response.data;

    const expiresAt = new Date(Date.now() + expires_in * 1000);

    const saved = await Token.findOneAndUpdate(
      { locationId },
      {
        locationId,
        companyId,
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt,
      },
      { upsert: true, new: true }
    );

    console.log("💾 TOKEN SAVED:", saved);

    return {
      success: true,
      message: "OAuth successful",
      data: response.data,
    };
  } catch (error) {
    console.log("❌ OAuth ERROR MESSAGE:", error.message);
    console.log("❌ STATUS:", error.response?.status);
    console.log("❌ DATA:", error.response?.data);
    console.log("❌ FULL ERROR:", error);

    return {
      success: false,
      message: error.response?.data || error.message,
    };
  }
};

module.exports = {
  OAuthCallback,
};