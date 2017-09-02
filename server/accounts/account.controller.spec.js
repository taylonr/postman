const expect = require('chai').expect;
const td = require('testdouble');
const controller = require('./account.controller');
const Account = require('../models/').account;

const createReq = (params = {}, body = {}) => {
  return {
    body: body,
    originalUrl: 'accounts',
    params: params,
    protocol: 'http',

    get: () => {
      return 'localhost:3000';
    }
  };
};

const createRes = (fake) => {
  const res =  {
    status: function(code){
      fake.status = code;
      return this;
    },
    send: td.function(),
    end: td.function()
  };

  return res;
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
};

describe('When deleting an item', () => {
  it('Should set the status of 204', () => {
    fakeDestroy();

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
    fakeDestroy();

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

describe('When updating an object', () => {
  it('Should return a 200', () => {
    const update = td.replace(Account, 'update');
    td.when(update({
      name: 'test'
    })).thenResolve({
      id: 1,
      name: 'test'
    });

    fakeById(1, {
      id: 1,
      update: update
    });

    const req = createReq({
      id: 1
    }, {
      name: 'test'
    });

    const response = {};
    const res = createRes(response);

    return controller.updateById(req, res).then(() => {
      return expect(response.status).to.eql(200);
    });
  });
});

const fakeCreate = () => {
  const create = td.replace(Account, 'create');
  td.when(create({
    name: 'New Account'
  })).thenResolve({
    dataValues: {
      id: 1,
      name: 'New Account'
    }
  });
};

describe('When creating an object', () => {
  it('Should set status 200', () => {
    fakeCreate();

    const req = createReq({}, {
      name: 'New Account'
    });

    const response = {};
    const res = createRes(response);

    return controller.create(req, res).then(() => {
      return expect(response.status).to.eql(200);
    });
  });

  it('Should include a link to itself in the respose', () => {
    fakeCreate();

    const req = createReq({}, {
      name: 'New Account'
    });

    const res = createRes({});

    return controller.create(req, res).then(() => {
      td.verify(res.send({
        dataValues: {
          id: 1,
          name: 'New Account',
          links: [{
            rel: 'self',
            href: 'http://localhost:3000/accounts/1'
          }]
        }
      }));
    });
  });

  describe('And the call failed', () => {
    it('Should return 500', () => {
      const create = td.replace(Account, 'create');
      td.when(create({
        name: 'New Account'
      })).thenReject({});

      const req = createReq({}, {
        name: 'New Account'
      });

      const response = {};
      const res = createRes(response);

      return controller.create(req, res).then(() => {
        expect(response.status).to.eql(500);
      });
    });
  });
});