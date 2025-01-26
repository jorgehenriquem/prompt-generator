const request = require("supertest");
const app = require("../src/app");

describe("Healthcheck Route", () => {
  it('should return status 200 and status "OK"', async () => {
    const response = await request(app).get("/healthcheck");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Service is up and running!");
  });
});
