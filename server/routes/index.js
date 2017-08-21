const accountsController = require('../controllers/account');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the accounts API!',
  }));

  app.get('/accounts', accountsController.list);
};