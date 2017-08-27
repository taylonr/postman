'use strict';
module.exports = (sequelize) => {
    const wishlist = sequelize.define('wishlist', {
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                wishlist.hasMany(models.book);
            }
        }
    });

    return wishlist;
};