'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    email: {
      type:DataTypes.STRING,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    wishlistId: DataTypes.INTEGER
  });

  user.associate = (models) => {
    user.belongsTo(models.wishlist);
  };
  return user;
};