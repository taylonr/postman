const basicAuth = require('express-basic-auth');
const booksController = require('../books/book.controller');

const authorize = basicAuth({
  users: {'admin': 'admin'}
});

module.exports = (app) => {
  app.delete('/books/:id', authorize, booksController.deleteById);
  app.get('/books', booksController.list);
  app.get('/books/:id', booksController.getById);

  app.post('/books', authorize, booksController.create);
  app.put('/books/:id', authorize, booksController.updateById);

  app.use((req, res) => {
    res.status(404).end();
  });
};