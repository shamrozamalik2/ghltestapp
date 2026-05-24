const axios = require("axios");
const Token = require("../models/token");

const OAuthCallback = async (req) => {
  try {
    const { code } = req.query;

    if (!code) {
      return { success: false, message: "Missing code" };
    }

    // 1. Exchange code for token
    const params = new URLSearchParams();
    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.REDIRECT_URI);

    const tokenRes = await axios.post(
      "https://services.leadconnectorhq.com/oauth/token",
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token, expires_in, companyId } = tokenRes.data;
    const expiresAt = new Date(Date.now() + expires_in * 1000);

    // 2. Fetch all locations under this company
    const locationsRes = await axios.get(
      "https://services.leadconnectorhq.com/locations/search",
      {
        params: { companyId },
        headers: {
          Authorization: `Bearer ${access_token}`,
          Version: "2021-07-28",
        },
      }
    );

    const locations = locationsRes.data.locations;
    console.log(`✅ Found ${locations.length} locations for company ${companyId}`);

    // 3. Save token for each location
    for (const loc of locations) {
      await Token.findOneAndUpdate(
        { locationId: loc.id },
        {
          locationId: loc.id,
          companyId,
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt,
        },
        { upsert: true, new: true }
      );
      console.log(`💾 Token saved for locationId: ${loc.id}`);
    }

    return {
      success: true,
      message: `OAuth successful. Tokens saved for ${locations.length} locations.`,
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