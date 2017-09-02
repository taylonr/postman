const expect = require('chai').expect;
const td = require('testdouble');
const createRes = require('../../test.helpers/response.helper').createRes;
const Book = require('../models').book;
const controller = require('./book.controller');

describe('Books controller', () => {
  describe('When getting a list of books', () => {
    it('Should return ok', () => {
      const response = {};
      const res = createRes(response);
      const req = {
      };

      const all = td.replace(Book, 'all');
      td.when(all()).thenResolve({});

      return controller.list(req, res).then(() => {
        return expect(response.status).to.eql(200);
      });
    });
  });
});