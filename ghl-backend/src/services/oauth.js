const axios = require("axios");
const Token = require("../models/token");

const OAuthCallback = async (req) => {
  try {
    const { code, locationId, companyId } = req.query;

    if (!code) {
      return { success: false, message: "Missing code" };
    }

    const params = new URLSearchParams();

    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.REDIRECT_URI);

    const response = await axios.post(
      "https://services.leadconnectorhq.com/oauth/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    const expiresAt = new Date(Date.now() + expires_in * 1000);

    await Token.findOneAndUpdate(
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

    return {
      success: true,
      message: "OAuth successful",
      data: response.data,
    };
  } catch (error) {
    console.log("❌ OAuth ERROR:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data || error.message,
    };
  }
};

module.exports = {
  OAuthCallback,
};