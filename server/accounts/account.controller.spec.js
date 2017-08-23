const expect = require('chai').expect;
const td = require('testdouble');
const controller = require('./account.controller');
const Account = require('../models/').account;

const createReq = (params) => {
  return {
    params: params || {}
  };
}

const createRes = (fake) => {
  return {
    status: function(code){
      fake.status = code;
      return this;
    },
    send: (result) => {
      fake.data = result;
    }
  }
};

const fakeById = (id, obj) => {
  const findById = td.replace(Account, 'findById');
  td.when(findById(id || 1))
    .thenResolve(obj || {
      name: 'test',
      id: 1
    });

};

describe('When getting a specific item', () => {
  afterEach(() => {
    td.reset();
  });

  it('Should return a status code 200', () => {
    fakeById();
    const req = createReq({
        id: 1
    });

    let response = {};
    const res = createRes(response);

    return controller.getById(req, res).then(() => {
      return expect(response.status).to.eql(200);
    });
  });

  it('Should send the account back', () => {
    fakeById();
    const req = createReq({
        id: 1
    });

    let result = {};
    const res = createRes(result);

    return controller.getById(req, res).then(() => {
      return expect(result.data).to.eql({
        id: 1,
        name: 'test'
      });
    });
  });
});