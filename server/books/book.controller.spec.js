const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const td = require('testdouble');
const Book = require('../models').book;
const controller = require('./book.controller');

describe('Books controller', () => {
  describe('When getting a list of books', () => {
    it('Should return ok', () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      const all = td.replace(Book, 'all');
      td.when(all()).thenResolve({});

      controller.list(req, res).then(() => {
        return expect(res.statusCode).to.eql(200);
      });
    });
  });
});