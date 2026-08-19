const request = require("supertest");
const app = require("..");
const axios = require('axios');

describe("Transaction data testing", () => {

    let token;
    let refreshToken;

beforeAll(async () => {
    const response = await axios.post('http:localhost:3000/api/user/signInUser', 
      { email: "test@gmail.com", password: "samrat" },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
     token= response.data.token;

     const setCookieHeaders = response.headers["set-cookie"];
     const refreshTokenCookie = setCookieHeaders.find((cookie) =>
       cookie.includes("refreshToken")
     );
     if (refreshTokenCookie) {
       const match = refreshTokenCookie.match(/refreshToken=([^;]+)/);
       refreshToken = match[1];
     }

});
  test("getTransactionTesting", async()=>
    {const response = await request(app)
        .get("/api/transaction/getTransactions?volume=44-100&amount=2000-60000&days=1")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .set("Cookie", `refreshToken=${refreshToken}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("transaction")
});

test("getTransactionsTestingForError", async()=>
{
    const response = await request(app)
    .get("/api/transaction/getTransactions?volume=4w-100")
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .set("Cookie", `refreshToken=${refreshToken}`)
expect(response.status).toBe(400);
expect(response.body.message).toBe("Please provide the valid range for volume")  
})

test("Testing for count by status", async()=>
{
  const response= await request(app).
  get("/api/transaction/getTransactionCountByStatus")
  .set("Accept", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .set("Cookie", `refreshToken=${refreshToken}`)

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("status")
  ;
})
});
