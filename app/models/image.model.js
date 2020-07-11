'use strict';

module.exports = (sequelize, Sequelize) => {
    const Product = require('./product.model')(sequelize, Sequelize);
    const Image = sequelize.define('image',
        {
            type: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.TEXT
            },
            data: {
                type: Sequelize.BLOB('long')
            }
        }
    );
    Image.belongsTo(Product);
    return Image;
};
