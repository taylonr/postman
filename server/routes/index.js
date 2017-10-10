const path = require('path');
const basicAuth = require('express-basic-auth');
const booksController = require('../controllers/book.controller');
const env  = process.env.NODE_ENV || 'development';

const authorize = basicAuth({
  users: {'admin': env === 'test' ? 'admin_test' : 'admin'}
});

const apiToken = (req, res, next) => {
  const token = req.get('G-TOKEN');
  if (token === 'ROM831ESV') {
    next();
  } else {
    res.status(403).end();
  }
};

module.exports = (app, express) => {
  app.get('/ui', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
  });

  app.get('/landing', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'landing.html'));
  });

  app.use(apiToken);

  app.get('/books', booksController.list);
  app.post('/books', booksController.create);
  app.get('/books/search', booksController.search);
  app.get('/books/:id', booksController.getById);
  app.put('/books/:id', booksController.updateById);

  const authorized = express.Router();
  app.use(authorized);

  authorized.use(authorize);

  authorized.delete('/books/:id', booksController.deleteById);
  authorized.put('/books/:id', booksController.updateById);

};