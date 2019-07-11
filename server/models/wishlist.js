'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishlist = sequelize.define('wishlist', {
    name: DataTypes.STRING,
  });

  wishlist.associate = (models) => {
    wishlist.belongsToMany(models.book, {through: 'wishlistBooks'});
  };
  return wishlist;
};