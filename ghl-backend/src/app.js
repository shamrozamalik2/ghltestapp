const express = require("express");
const app = express();

const { BASE_PATH } = require("./middleware/basePath");
const applyMiddlewares = require("./middleware");

const oauthRoutes = require("./routes/oauth");
const webhookRoutes = require("./routes/webhook");
const contactRoutes = require("./routes/contact");

// ✅ middlewares first
applyMiddlewares(app);

// ✅ routes
app.use(`${BASE_PATH}/oauth`, oauthRoutes);
app.use(`${BASE_PATH}/webhook`, webhookRoutes);
app.use(`${BASE_PATH}/contact`, contactRoutes);

app.get("/", (req, res) => res.send("GHL Backend Running 🚀"));

module.exports = app;