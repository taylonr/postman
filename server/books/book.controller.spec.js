const httpMocks = require('node-mocks-http');
const td = require('testdouble');
const responses = require('../responses');
const Book = require('../models').book;
const controller = require('./book.controller');

describe('Books controller', () => {
  afterEach(() => {
    td.reset();
  });
  describe('When getting a list of books', () => {
    it('Should return ok', () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      const all = td.replace(Book, 'all');
      td.when(all()).thenResolve({});

      const ok = td.replace(responses, 'ok');

      return controller.list(req, res).then(() => {
        td.verify(ok(res));
      });
    });

    describe('And the call fails', () => {
      it('Should call server error', () => {
        const all = td.replace(Book, 'all');
        td.when(all()).thenReject('err');

        const err = td.replace(responses, 'serverError');

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        return controller.list(req, res).then(() => {
          td.verify(err(res, 'err'));
        });
      });
    });
  });
});