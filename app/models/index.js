'use strict';

const dbConfig = require('../../db.config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("./category.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.brand = require("./brand.model.js")(sequelize, Sequelize);
db.image = require("./image.model.js")(sequelize, Sequelize);
db.productsList = require("./pageList.model.js")(sequelize, Sequelize);

module.exports = db;
