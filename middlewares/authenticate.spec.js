const authenticate = require("./authenticate");

describe("Middlewares", () => {
  describe("authenticate", () => {
    it("Should have id 1", () => {
      const req = {
        header: jest.fn().mockReturnValue("1")
      };
      const res = {
        sendStatus: jest.fn()
      };
      const next = jest.fn();

      authenticate(req, res, next);

      expect(req.header).toHaveBeenCalledWith("user_id");
      expect(res.sendStatus).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);
    });

    it("Should fail if user is not the one with id 1", () => {
      const req = {
        header: jest.fn().mockReturnValue("2")
      };
      const res = {
        sendStatus: jest.fn()
      };
      const next = jest.fn();

      authenticate(req, res, next);

      expect(req.header).toHaveBeenCalledWith("user_id");
      expect(res.sendStatus).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
