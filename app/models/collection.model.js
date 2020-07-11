'use strict';

module.exports = (sequelize, Sequelize) => {
    const Product = require('./product.model')(sequelize, Sequelize);
    const Collection = sequelize.define('collection', {
    });
    // Collection.belongsTo(Product);
    return Collection;
};
