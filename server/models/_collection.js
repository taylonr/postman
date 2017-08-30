'use strict';
module.exports = (sequelize) => {
    const collection = sequelize.define('collection', {
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                collection.hasMany(models.book);
            }
        }
    });

    return collection;
};