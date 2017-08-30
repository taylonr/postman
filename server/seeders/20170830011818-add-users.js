'use strict';
const Household = require('../models/').household;

module.exports = {
    up: (queryInterface) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
        return Household.create({
            name: 'Taylors'
        }).then((household) => {
            return queryInterface.bulkInsert('users', [{
                email: 'taylonr@gmail.com',
                firstName: 'Nate',
                lastName: 'Taylor',
                householdId: household.id,
                createdAt: new Date(),
                updatedAt: new Date()
            },{
                email: 'taylonr+chip@gmail.com',
                firstName: 'Chocolate Chip',
                lastName: 'Taylor',
                householdId: household.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }]);
        });

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
