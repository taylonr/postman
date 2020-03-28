const expect = require("chai").expect;
const httpMocks = require("node-mocks-http");
const td = require("testdouble");
const Household = require("../models").household;
const controller = require("./household.controller");

describe("Household Controller", () => {
  afterEach(() => {
    td.reset();
  });

});