const Book = require('../models').book;
const User = require('../models').user;
const Wishlist = require('../models').wishlist;
const responses = require('../responses');
const CrudController = require('./crud.controller');
const ramda = require('ramda');
const pipe = ramda.pipe,
  pluck = ramda.pluck,
  flatten = ramda.flatten,
  uniqBy = ramda.uniqBy,
  prop = ramda.prop;

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
  getBooks: (req, res) => {
    return Wishlist
      .findAll({
        attributes: ['id', 'name'],
        where: {
          id: req.params.wishlistId
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
  },

  getByHouseholdId: (req, res) => {
    return User.findAll({
      attributes: [],
      where: {
        householdId: req.params.householdId
      },
      include: [{
        model: Wishlist,
        attributes: ['id'],
        include: [{
          model: Book,
          attributes: ['title', 'author', 'isbn'],
          through: {
            attributes: []
          }
        }]
      }]
    }).then((data) => {
      const books = pipe(
        pluck('wishlist'),
        pluck('books'),
        flatten(),
        uniqBy(prop('isbn'))
      )(data);
      return responses.ok(res)(books);
    });
  }
});