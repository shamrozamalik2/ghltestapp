const ReceiveWebhook = async (req) => {
  const event = req.headers["x-gohighlevel-event"];

  console.log("🔥 Event:", event);
  console.log("📩 Data:", req.body);

  switch (event) {
    case "ContactCreate":
      console.log("New Contact Created");
      break;

    case "OpportunityCreate":
      console.log("New Opportunity");
      break;

    default:
      console.log("Unknown Event");
  }

  return {
    success: true,
    message: "Webhook received",
  };
};

module.exports = {
  ReceiveWebhook,
};