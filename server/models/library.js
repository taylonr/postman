'use strict';
module.exports = (sequelize) => {
    const library = sequelize.define('library', {
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                library.hasMany(models.book);
            }
        }
    });

    return library;
};