'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('accounts', [{
      name: 'Wired Brain Cofee',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Globomantics',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: function () {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
