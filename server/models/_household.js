'use strict';
module.exports = (sequelize, DataTypes) => {
    const household = sequelize.define('household', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                household.hasMany(models.user);
            }
        }
    });

    return household;
};