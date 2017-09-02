const basicAuth = require('express-basic-auth');
const booksController = require('../books/book.controller');

const authorize = basicAuth({
  users: {'admin': 'admin'}
});

module.exports = (app, express) => {
  app.get('/books', booksController.list);
  app.get('/books/:id', booksController.getById);
  app.post('/books', booksController.create);

  const authorized = express.Router();
  app.use(authorized);

  authorized.use(authorize);

  authorized.delete('/books/:id', booksController.deleteById);
  authorized.put('/books/:id', booksController.updateById);

};