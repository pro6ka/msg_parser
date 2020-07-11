'use strict';

module.exports = app => {
    const categories = require('../controllers/category.controller')
    let router = require('express').Router();
    router.get('/', categories.findAll);
    router.get("/published", categories.findAllPublished);
    router.get("/:id", categories.findOne);
    // app.use('/categories');
};
