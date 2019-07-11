'use strict';
module.exports = (sequelize, DataTypes) => {
  var book = sequelize.define('book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: DataTypes.STRING,
    publicationDate: DataTypes.DATEONLY,
    isbn: DataTypes.STRING
  });

  book.associate = (models) => {
    book.belongsToMany(models.wishlist, {through: 'wishlistBooks'});
  };
  return book;
};