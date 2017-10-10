const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const td = require('testdouble');
const Household = require('../models').household;
const controller = require('./household.controller');

describe('Household Controller', () => {
  afterEach(() => {
    td.reset();
  });

  const fakeCreate = () => {
    const create = td.replace(Household, 'create');
    td.when(create({
      name: 'Household'
    })).thenResolve({
      dataValues: {
        id: 1,
        name: 'Household'
      }
    });
  };

  describe('When creating a new household', () => {
    it('Should return 200', () => {
      fakeCreate();

      const req = httpMocks.createRequest({
        body: {
          name: 'Household'
        }
      });

      const res = httpMocks.createResponse();

      return controller.create(req, res).then(() => {
        return expect(res.statusCode).to.eql(200);
      });
    });

    it('Should include a link to itself in the respose', () => {
      fakeCreate();

      const req = httpMocks.createRequest({
        body: {
          name: 'Household'
        },
        originalUrl: 'households',
        protocol: 'http',
      });

      req.get = () => {
        return 'localhost:3000';
      };

      const res = httpMocks.createResponse();

      return controller.create(req, res).then(() => {
        expect(res._getData().dataValues.links).to.eql([{
              rel: 'self',
              href: 'http://localhost:3000/households/1'
            }]);
      });
    });

    describe('And the call failed', () => {
      it('Should return 500', () => {
        const create = td.replace(Household, 'create');
        td.when(create({
          name: 'Household'
        })).thenReject({});

        const req = httpMocks.createRequest({
          body: {
            name: 'Household'
          }
        });

        const res = httpMocks.createResponse();

        return controller.create(req, res).then(() => {
          expect(res.statusCode).to.eql(500);
        });
      });
    });
  });
});