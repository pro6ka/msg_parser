'use strict';

module.exports = (sequelize, Sequelize) => {
    const Category = require('./category.model')(sequelize, Sequelize);
    const PageList = sequelize.define('pageList', {
        title: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
    });
    PageList.belongsTo(Category);
    return PageList;
};
