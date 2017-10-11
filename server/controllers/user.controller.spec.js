const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const td = require('testdouble');
const User = require('../models').user;
const controller = require('./user.controller');

describe('Users controller', () => {
  describe('When getting by household id', () => {
    it('Should return all users with the household id', () => {
      const find = td.replace(User, 'findAll');
      td.when(find({
        where: {
          householdId: 2
        }
      })).thenResolve([{email: 'test@abc.com'}]);

      const req = httpMocks.createRequest({
        params: {
          householdId: 2
        }
      });

      const res = httpMocks.createResponse();

      return controller.getByHouseholdId(req, res).then(() => {
        expect(res._getData()).to.eql([{
          email: 'test@abc.com'
        }]);
      });
    });
  });
});