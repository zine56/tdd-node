//{
//    "userId": 1,
//    "id": 1,
//    "title": "titulo",
//    "body": "Cuerpo del post"
//  }
const postHandlers = require("./index");

describe("Endpoints", () => {
  describe("post", () => {
    it("should create", async () => {
      const mockUsers = [{ id: 1 }, { id: 2 }];
      const post = {
        userId: 1,
        title: "titulo",
        body: "Cuerpo del post"
      };

      const req = {
        body: post
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } })
      };

      await postHandlers({ axios }).post(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(axios.post).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts",
        post
      );
      expect(res.send).toHaveBeenCalledWith({ id: 1000 });
      expect(axios.get).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users"
      );
    });

    it("Should not create if the userId does not exists", async () => {
      const mockUsers = [{ id: 1 }, { id: 2 }];
      const post = {
        userId: 3,
        title: "titulo",
        body: "Cuerpo del post"
      };

      const req = {
        body: post
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        sendStatus: jest.fn()
      };

      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUsers }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } })
      };

      await postHandlers({ axios }).post(req, res);

      expect(axios.post).not.toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });
});
