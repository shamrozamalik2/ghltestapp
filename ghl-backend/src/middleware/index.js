const express = require("express");
const morgan = require("morgan");

const applyMiddlewares = (app) => {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use((req, res, next) => {
    console.log(`➡️  ${req.method} ${req.url}`);
    next();
  });
};

module.exports = applyMiddlewares;