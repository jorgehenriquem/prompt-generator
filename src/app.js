require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { createContainer, asClass, asValue } = require("awilix");
const routes = require("./interfaces/routes");
const HealthCheckController = require("./interfaces/controllers/HealthCheckController");
const categoryRoutes = require("./interfaces/routes/CategoryRoutes");

const app = express();

app.use(express.json());

const container = createContainer();

container.register({
  healthCheckController: asClass(HealthCheckController).singleton(),
  categoryRoutes: asValue(categoryRoutes),
});

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(null)); //@TODO: add swagger documentation
app.use("/api", container.resolve("categoryRoutes")); // Corrigido para usar diretamente o roteador

app.use("/health", (req, res) =>
  container.resolve("healthCheckController").handle(req, res)
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
