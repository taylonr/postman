const expect = require("chai").expect;
const httpMocks = require("node-mocks-http");
const td = require("testdouble");
const User = require("../models").user;
const Wishlist = require("../models").wishlist;
const controller = require("./user.controller");

describe("Users controller", () => {
  describe("When getting by household id", () => {
    it("Should return all users with the household id", () => {
      const find = td.replace(User, "findAll");
      td.when(find({
        where: {
          householdId: 2
        }
      })).thenResolve([{ email: "test@abc.com" }]);

      const req = httpMocks.createRequest({
        params: {
          householdId: 2
        }
      });

      const res = httpMocks.createResponse();

      return controller.getByHouseholdId(req, res).then(() => {
        expect(res._getData()).to.eql([{
          email: "test@abc.com"
        }]);
      });
    });
  });

  describe("When creating a new user", () => {
    it("Should create a new wishlist", () => {
      const wishlistCreate = td.replace(Wishlist, "create");
      td.when(wishlistCreate({
        name: "Nate's List"
      })).thenResolve({
        dataValues: {}
      });

      const req = httpMocks.createRequest({
        body: {
          email: "test@abc.com",
          firstName: "Nate"
        }
      });

      const res = httpMocks.createResponse();

      controller.create(req, res);
    });

    it("Should add the new wishlist id to the user", () => {
      const wishlistCreate = td.replace(Wishlist, "create");
      td.when(wishlistCreate({
        name: "Nate's List"
      })).thenResolve({
        dataValues: {
          id: 1,
          name: "Nate's List"
        }
      });

      const userCreate = td.replace(User, "create");
      td.when(userCreate({
        email: "test@abc.com",
        firstName: "Nate",
        wishlistId: 1
      })).thenResolve({
        dataValues: {
          id: 1
        }
      });

      const req = httpMocks.createRequest({
        body: {
          email: "test@abc.com",
          firstName: "Nate"
        }
      });

      const res = httpMocks.createResponse();

      return controller.create(req, res).then(() => {
        expect(res._getData().dataValues.id).to.eql(1);
      });
    });
  });
});