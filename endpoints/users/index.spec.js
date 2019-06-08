const handlers = require("./index");

describe("Endpoints", () => {
  describe("users", () => {
    describe("get", () => {
      it("returns to users json", async () => {
        const axios = {
          get: jest.fn().mockResolvedValue({ data: 1 })
        };

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
        await handlers({ axios }).get({}, res);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send).toHaveBeenCalledWith(1);
      });
    });

    describe("post", () => {
      it("create a resource", async () => {
        const axios = {
          post: jest.fn().mockResolvedValue({ data: 1 })
        };

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        };
        const req = {
          body: "request body"
        };

        await handlers({ axios }).post(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(
          "https://jsonplaceholder.typicode.com/users",
          "request body"
        );
      });
    });

    describe("put", () => {
      it("updates resources", async () => {
        const axios = {
          put: jest.fn().mockResolvedValue({ data: 1 })
        };

        const res = {
          sendStatus: jest.fn()
        };
        const req = {
          body: "put resource",
          params: {
            id: 12
          }
        };

        await handlers({ axios }).put(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(204);
        expect(axios.put).toHaveBeenCalledWith(
          "https://jsonplaceholder.typicode.com/users/12",
          "put resource"
        );
      });
    });

    describe("delete", () => {
      it("delete a resource", async () => {
        const req = {
          params: {
            id: 12
          }
        };

        const res = {
          sendStatus: jest.fn()
        };

        const axios = {
          delete: jest.fn().mockResolvedValue()
        };

        await handlers({axios}).delete(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(204);
        expect(axios.delete).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/12')
        
      });
    });
  });
});
