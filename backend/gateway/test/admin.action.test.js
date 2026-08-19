const request = require("supertest");
const axios = require("axios");
const app = require("..");

let token;
let refreshToken;
beforeAll(async () => {
  const response = await axios.post(
    "http://localhost:3000/api/admin/signin",
    {
      email: "abiskarlamichhane@gmail.com",
      password: "abiskar123",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  token = response.data.token;
  const setCookieHeaders = response.headers["set-cookie"];
  const refreshTokenCookie = setCookieHeaders.find((cookie) =>
    cookie.includes("refreshToken")
  );
  if (refreshTokenCookie) {
    const match = refreshTokenCookie.match(/refreshToken=([^;]+)/);
    refreshToken = match[1];
  }
});

describe("Admin action test", () => {
  test("Create a role", async () => {
    const response = await request(app)
      .post("/api/admin/action/createrole")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", `refreshToken=${refreshToken}`)
      .send({
        volumeFilterId: 4,
        amountFilterId: 5,
        daysFilterId: 6,
        roleName: "Access12",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("success", true);
  });

  test("Fetch role details", async () => {
    const response = await request(app)
      .get("/api/admin/action/getRoleDetails/8")
      .set("Authorization", `Bearer ${token}`)
      .set("Cookie", `refreshToken=${refreshToken}`);

    expect(response.body).toHaveProperty("role");
    expect(response.body).toHaveProperty("filters");
  });
});
