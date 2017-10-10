const Household = require('../models').household;
const responses = require('../responses');
const url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}

module.exports = {
  create: (req, res) => {
    return Household
      .create(req.body)
      .then((household) => {
        household.dataValues.links = [{
          rel: 'self',
          href: `${fullUrl(req)}/${household.dataValues.id}`
        }];

        return responses.ok(res)(household);
      })
      .catch(responses.serverError(res));;
  }
}