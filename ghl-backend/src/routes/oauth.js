const express = require("express");
const router = express.Router();

const oauth = require("../services/oauth");
const { ReqMethods } = require("../enums/reqMethods");
const { ApiErrorHandler } = require("../utils/ApiErrorHandler");

const Route = () => {
  const routes = [
    {
      method: ReqMethods.GET,
      url: "/callback",
      middlewares: [],
      fn: ApiErrorHandler(oauth.OAuthCallback),
    },
  ];

  for (var route of routes) {
    const { method, url, middlewares, fn } = route;
    router[method](url, ...middlewares, fn);
  }

  return router;
};

module.exports = Route();