const basicAuth = require('express-basic-auth');
const booksController = require('../books/book.controller');

const authorize = basicAuth({
  users: {'admin': 'admin'}
});

module.exports = (app, express) => {
  app.get('/books', booksController.list);
  app.get('/books/:id', booksController.getById);

  const authorized = express.Router();
  app.use(authorized);

  authorized.use(authorize);

  authorized.delete('/books/:id', booksController.deleteById);
  authorized.post('/books', booksController.create);
  authorized.put('/books/:id', booksController.updateById);

};