'use strict';

const parserTools = require('../parser/tools');
const categoryConfig = require('../../category.config');

module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define('brand',
        {
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
        }
    );
    return Brand;
};
