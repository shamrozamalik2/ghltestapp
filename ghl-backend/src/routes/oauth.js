const express = require("express");
const router = express.Router();

const services = require("../services/services");
const { ReqMethods } = require("../enums/reqMethods");
const { ApiErrorHandler } = require("../utils/ApiErrorHandler");

const Route = () => {
  const routes = [
    {
      method: ReqMethods.GET,
      url: "/callback",
      middlewares: [],
      fn: ApiErrorHandler(services.OAuthCallback),
    },
  ];

  for (var route of routes) {
    const { method, url, middlewares, fn } = route;
    router[method](url, ...middlewares, fn);
  }

  return router;
};

module.exports = Route();