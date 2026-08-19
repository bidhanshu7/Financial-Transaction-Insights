const request = require("supertest");
const app = require("..");

describe("Test admin Sign In route", () => {
  test("Test successful admin login", async () => {
    const response = await request(app).post("/api/admin/signin").send({
      email: "abiskarlamichhane@gmail.com",
      password: "abiskar123",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toMatch(/^[\w_-]*\.[\w_-]*\.[\w_-]*$/);
    expect(response.body.message).toEqual("Admin logged in successfully");
    expect(response.body.success).toBeTruthy();
  });

  test("Test invalid credentials", async () => {
    const response = await request(app).post("/api/admin/signin").send({
      email: "abiskarlamichhane@gmail.com",
      password: "abiskar12",
    });

    expect(response.body.message).toBe("Invalid credentials");
    expect(response.body.success).not.toBeTruthy();
  });
});
