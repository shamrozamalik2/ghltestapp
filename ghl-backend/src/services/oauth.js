const axios = require("axios");
const Token = require("../models/token");

const OAuthCallback = async (req) => {
  const { code, locationId, companyId } = req.query;

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
  };
};

module.exports = {
  OAuthCallback,
};