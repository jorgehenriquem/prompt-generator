require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { createContainer, asClass } = require("awilix");
const routes = require("./interfaces/routes");
const HealthCheckController = require("./interfaces/controllers/HealthCheckController");
const app = express();

app.use(express.json());

const container = createContainer();

container.register({
  healthCheckController: asClass(HealthCheckController).singleton(),
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(null)); //@TODO: add swagger documentation

app.use("/", (req, res) =>
  container.resolve("healthCheckController").handle(req, res)
);
app.use("/api", routes(container));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
