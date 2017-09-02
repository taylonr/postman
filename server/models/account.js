'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('account', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: function() {
        // associations can be defined here
      }
    }
  });
};