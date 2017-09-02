'use strict';

const env  = process.env.NODE_ENV || 'development';

module.exports = {
  up: (queryInterface) => {
    let books;

    if(env === 'test') {
      books = require('./data/books.test')();
    } else {
      books = require('./data/books')();
    }

    return queryInterface.bulkInsert('books', books);
  },

  down:  () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
