const expect = require("chai").expect;
const httpMocks = require("node-mocks-http");
const td = require("testdouble");
const Wishlist = require("../models").wishlist;
const Book = require("../models").book;
const User = require("../models").user;
const controller = require("./wishlist.controller");

describe("Wishlist controller", () => {
  afterEach(() => {
    td.reset();
  });

  const getBooksForHousehold = () => {
    const findAll = td.replace(User, "findAll");
    td.when(findAll({
      attributes: [],
      where: {
        householdId: 1
      },
      include: [{
        model: Wishlist,
        attributes: ["id"],
        include: [{
          model: Book,
          attributes: ["title", "author", "isbn"],
          through: {
            attributes: []
          }
        }]
      }]
    })).thenResolve([{
      wishlist: {
        books: [{
          title: "Test",
          isbn: "1"
        }]
      }
    }, {
      wishlist: {
        books: [{
          title: "Another Test",
          isbn: "2"
        }]
      }
    }]);

  };
  describe("When getting by household id", () => {
    it("Should get all books for the household", () => {
      getBooksForHousehold();

      const req = httpMocks.createRequest({
        params: {
          householdId: 1
        }
      });

      const res = httpMocks.createResponse();

      return controller.getByHouseholdId(req, res).then(() => {
        return expect(res._getData()).to.eql([{
          title: "Test",
          isbn: "1"
        }, {
          title: "Another Test",
          isbn: "2"
        }]);
      });
    });
  });
});