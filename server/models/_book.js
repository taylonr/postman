'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publicationDate: DataTypes.DATEONLY,
        isbn: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(/*models*/) {
                // associations can be defined here
            }
        }
    });
};