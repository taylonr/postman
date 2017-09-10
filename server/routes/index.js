const path = require('path');
const basicAuth = require('express-basic-auth');
const booksController = require('../books/book.controller');
const env  = process.env.NODE_ENV || 'development';

const authorize = basicAuth({
  users: {'admin': env === 'test' ? 'admin_test' : 'admin'}
});

const apiToken = (req, res, next) => {
  const token = req.get('PS-TOKEN');
  if (token === 'ROM831ESV') {
    next();
  } else {
    res.status(403).end();
  }
};

module.exports = (app, express) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
  });

  app.use(apiToken);

  app.get('/books', booksController.list);
  app.get('/books/search', booksController.search);
  app.get('/books/:id', booksController.getById);
  app.post('/books', booksController.create);

  const authorized = express.Router();
  app.use(authorized);

  authorized.use(authorize);

  authorized.delete('/books/:id', booksController.deleteById);
  authorized.put('/books/:id', booksController.updateById);

};