const request = require("supertest");
const app = require("..");
const { status } = require("@grpc/grpc-js");

describe("User actions test", () => {
  test("SignInUser", async () => {
    const response = await request(app)
      .post("/api/user/signInUser")
      .send({ email: "test@gmail.com", password: "samrat" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.token).toMatch(/^[\w_-]*\.[\w_-]*\.[\w_-]*$/);
    expect(response.body.message).toEqual("User login successful");
  });

  test("SignInUser EmailError", async () => {
    const response = await request(app)
      .post("/api/user/signInUser")
      .send({ email: "test1@gmail.com", password: "samrat1" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual(
      "User with this email does not exists"
    );
  });

  test("signInUser passwordIncorrectError", async () => {
    const response = await request(app)
      .post("/api/user/signInUser")
      .send({ email: "test@gmail.com", password: "samrat1" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(403);
    expect(response.body.message).toEqual("Invalid credentials");
  });
});
