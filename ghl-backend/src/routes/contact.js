const express = require("express");
const router = express.Router();

const services = require("../services/contact");
const { ReqMethods } = require("../enums/reqMethods");
const { ApiErrorHandler } = require("../utils/ApiErrorHandler");

const Route = () => {
  console.log("ReqMethods.POST value:", ReqMethods.POST); // 👈 add this
  console.log("Type:", typeof ReqMethods.POST);
  const routes = [
    {
      method: ReqMethods.POST,
      url: "/create-contact/:locationId",
      middlewares: [],
      // contact route handler should look like:
      fn: ApiErrorHandler(async (req, res) => {
        const result = await services.Create(req);
        res.json(result);
      }),
    },
  ];

  for (var route of routes) {
    const { method, url, middlewares, fn } = route;

    router[method](url, ...middlewares, fn);
  }

  return router;
};

module.exports = Route();