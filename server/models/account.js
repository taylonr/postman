'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Account', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
};