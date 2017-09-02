'use strict';
module.exports = (sequelize, DataTypes) => {
  var household = sequelize.define('household', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  household.associate = function(models) {
    // associations can be defined here
    household.hasMany(models.user);
  };

  return household;
};