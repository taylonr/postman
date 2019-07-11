'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('wishlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.addColumn('users', 'wishlistId',{
        type: Sequelize.INTEGER,
        references: {
          model: 'wishlists',
          key: 'id'
        }
      });
    }).then(() => {
      return queryInterface.createTable('wishlistBooks', {
        wishlistId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'wishlists',
            key: 'id'
          }
        },
        bookId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'books',
            key: 'id'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('wishlists');
  }
};