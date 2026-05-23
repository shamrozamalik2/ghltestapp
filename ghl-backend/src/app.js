const express = require("express");

const oauthRoutes = require("./routes/oauth");
const webhookRoutes = require("./routes/webhook");

const app = express();

app.use(express.json());

app.use("/oauth", oauthRoutes);
app.use("/webhook", webhookRoutes);

app.get("/", (req, res) => {
  res.send("GHL Backend Running 🚀");
});

module.exports = app;