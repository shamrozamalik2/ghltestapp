const axios = require("axios");
const Token = require("../models/token");

const createContact = async (req) => {
  const { locationId } = req.params;
  const { name, email, phone } = req.body;

  const tokenDoc = await Token.findOne({ locationId });

  if (!tokenDoc) {
    return {
      success: false,
      message: "No token found for this location",
    };
  }

  const response = await axios.post(
    "https://services.leadconnectorhq.com/contacts/",
    {
      firstName: name,
      email,
      phone,
    },
    {
      headers: {
        Authorization: `Bearer ${tokenDoc.accessToken}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
    }
  );

  return {
    success: true,
    message: "Contact created successfully",
    data: response.data,
  };
};

module.exports = {
  createContact,
};