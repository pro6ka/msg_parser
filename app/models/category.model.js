'use strict';

module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('category',
        {
            title: {
                type: Sequelize.STRING
            },
            url: {
                type: Sequelize.STRING
            },
            is_root: {
                type: Sequelize.BOOLEAN
            },
            description: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.STRING
            }
        }
    );
    return Category;
};
