class HealthCheckController {
  handle(req, res) {
    res.status(200).json({ message: "Service is up and running!" });
  }
}

module.exports = HealthCheckController;
