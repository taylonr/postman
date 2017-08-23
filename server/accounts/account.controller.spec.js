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
    send: td.function(),
    end: td.function()
  }
};

const fakeById = (id, obj) => {
  const findById = td.replace(Account, 'findById');
  const returnObject = obj === null || obj ?
    obj :
    {
      name: 'test',
      id: 1
    };

  td.when(findById(id || 1))
    .thenResolve(returnObject);

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
      td.verify(res.send({
        id: 1,
        name: 'test'
      }));
    });
  });

  describe('When the call fails', () => {
    it('Should set status to 500', () => {
      const findById = td.replace(Account, 'findById');
      td.when(findById(1))
        .thenReject({});

      const req = createReq({
        id: 1
      });

      const response = {};
      const res = createRes(response);

      return controller.getById(req, res).then(() => {
        return expect(response.status).to.eql(500);
      });
    });

    it('Should send the error back', () => {
      const findById = td.replace(Account, 'findById');
      td.when(findById(1))
        .thenReject('test');

      const req = createReq({
        id: 1
      });

      const response = {};
      const res = createRes(response);

      return controller.getById(req, res).then(() => {
        return td.verify(res.send('test'));

      });
    });
  });
});

const fakeDestroy = () => {
  const destroy = td.replace(Account, 'destroy');
  td.when(destroy()).thenResolve({});

  fakeById(1, {
    destroy
  });
}
describe('When deleting an item', () => {
  it('Should set the status of 204', () => {
    fakeDestroy()

    const req = createReq({
      id: 1
    });
    const response = {};
    const res = createRes(response);

    return controller.deleteById(req, res).then(() =>{
      return expect(response.status).to.eql(204);
    });
  });

  it('Should send an empty result', () => {
      fakeDestroy()

      const req = createReq({
        id: 1
      });
      const response = {};
      const res = createRes(response);

      return controller.deleteById(req, res).then(() =>{
        return td.verify(res.send());
      });
  });

  describe('And the account does not exit', () => {
    it('Should return a 204', () => {
      fakeById(1, null);

      const req = createReq({
        id: 1
      });

      const response = {};
      const res = createRes(response);

      return controller.deleteById(req, res).then(() => {
        return expect(response.status).to.eql(204);
      });

    });
  });
});