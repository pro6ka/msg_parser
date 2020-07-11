'use strict';

module.exports = (sequelize, Sequelize) => {
    const Category = require('./category.model')(sequelize, Sequelize);
    const Brand = require('./brand.model')(sequelize, Sequelize);
    // const Collection = require('./collection.model')(sequelize, Sequelize);

    const Product = sequelize.define('product',
        {
            title: {
                type: Sequelize.STRING
            },
            url: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DOUBLE
            },
            vendor_code: {
                type: Sequelize.STRING
            },
            vendor: {
                type: Sequelize.STRING
            },
            weight: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            short_description: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.STRING
            },
            image_alt: {
                type: Sequelize.STRING
            }
        }
    );
    // Product.belongsTo(Collection);
    Product.belongsTo(Category);
    Product.belongsTo(Brand);
    Product.belongsToMany(Product, {as: 'Collection', through: 'ProductCollection'});
    return Product;
};
