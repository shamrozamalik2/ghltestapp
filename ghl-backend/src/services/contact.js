const axios = require("axios");
const Token = require("../models/token");

const Create = async (req) => {
  try {
    const { appId } = req.params;
    const { locationId } = req.body.extras;
    console.log("locationId:", locationId);
    const { firstName, lastName, email, phone } = req.body;

    const tokenDoc = await Token.findOne({
      "extras.locationId": locationId,
    });
    console.log("tokenDoc:", tokenDoc);

    if (!tokenDoc) {
      return {
        success: false,
        message: "Token not found for this location",
      };
    }

    const response = await axios.post(
      "https://services.leadconnectorhq.com/contacts/",
      {
        firstName,
        lastName,
        email,
        phone,
        locationId,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenDoc.accessToken}`,
          Version: "2023-02-21",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return {
      success: true,
      message: "Contact created successfully",
      data: response.data,
    };
  } catch (error) {
    console.log("❌ Create Contact Error:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data || error.message,
    };
  }
};

module.exports = {
  Create,
};