const booksController = require('../books/book.controller');

module.exports = (app) => {
  app.delete('/books/:id', booksController.deleteById);
  app.get('/books', booksController.list);
  app.get('/books/:id', booksController.getById);
  app.post('/books', booksController.create);
  app.put('/books/:id', booksController.updateById);

  app.use((req, res) => {
    res.status(404).end();
  });
};