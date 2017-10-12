const Book = require('../models').book;
const Wishlist = require('../models').wishlist;
const responses = require('../responses');
const CrudController = require('./crud.controller');

module.exports = new CrudController(Wishlist, {
  addBook: (req, res) => {
    return Wishlist
      .findById(req.params.wishlistId)
      .then((wishlist) => {
        return Book
          .findById(req.params.bookId)
          .then((book) => {
            return wishlist
              .addBook(book)
              .then(() => {
                return responses.ok(res)(null);
              });
          });
      });
  },
  getById: (req, res) => {
    return Wishlist
      .findAll({
        attributes: ['id', 'name'],
        where: {
          id: req.params.id
        },
        include: [{
          model: Book,
          attributes: ['title', 'author', 'isbn'],
          through: {
            attributes: []
          }
        }]
      }).then((wishlist) => {
        return responses.ok(res)(wishlist[0]);
      });
  }
});