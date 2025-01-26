const express = require("express");

module.exports = (container) => {
  const router = require("express").Router();
  const healthCheckController = container.resolve("healthCheckController");
  router.get("/healthcheck", healthCheckController.check);

  return router;
};
