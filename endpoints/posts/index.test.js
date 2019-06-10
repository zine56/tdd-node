const request = require("supertest");
const app = require("../../server");

describe("server", () => {
  describe("endpoints", () => {
    describe("Post POST", () => {
      it.skip("Create new post", async () => {
        const response = await request(app)
          .post("/")
          .send({ userId: 5 })
          .set("user_id", 1)
          .set("Content-Type", "application/json");
        expect(response.statusCode).toEqual(201);
        expect(response.body.userId).toEqual(5);
        expect(response.body).toHaveProperty("id");
      });

      it("Does not create a new post", async () => {
        const response = await request(app)
          .post("/")
          .send({ userId: 100 })
          .set("user_id", 1)
          .set("Content-Type", "application/json");
        expect(response.statusCode).toEqual(400);
      });
    });
  });
});
