const express = require("express");

const oauthRoutes = require("./modules/oauth/routes");
const webhookRoutes = require("./modules/webhook/routes");

const app = express();

app.use(express.json());

app.use("/oauth", oauthRoutes);
app.use("/webhook", webhookRoutes);

app.get("/", (req, res) => {
  res.send("GHL Backend Running 🚀");
});

module.exports = app;