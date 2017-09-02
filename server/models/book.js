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
  return book;
};