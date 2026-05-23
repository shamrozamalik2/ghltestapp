const express = require("express");
const app = express();

const { BASE_PATH } = require("./basePath");

// const Docs = require("./modules/docs/routes");
const oauthRoutes = require("../routes/oauth");
const webhookRoutes = require("../routes/webhook");

app.use(express.json());

// 🔥 centralized base path
app.use(BASE_PATH + "/oauth", oauthRoutes);
app.use(BASE_PATH + "/webhook", webhookRoutes);

module.exports = app;