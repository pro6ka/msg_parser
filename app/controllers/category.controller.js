'use strict';

const db = require('../models');
const Category = db.category;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: 'Value of title can not be empty'
        });
    }
    const category = {
        published: true,
        title: req.body.title,
        is_root: req.body.isRoot,
        description: req.body.description,
        image: req.body.image,
        createdAt: req.body.createdAt ? req.body.createdAt : Date.now(),
        updatedAt: req.body.updatedAt ? req.body.updatedAt : Date.now(),
        Parent: req.body.parent ? req.body.parent : false
    };

    Category.create(category).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Category."
        });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    Category.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => { // jshint ignore:line
            res.status(404).send({
                message: "Error retrieving Category with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {where: {id: id}})
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
                });
            }
        }).catch(err => { // jshint ignore:line 
        res.status(500).send({
            message: "Error updating Category with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({where: {id: id}})
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            }
        }).catch(err => { // jshint ignore: line
        res.status(500).send({
            message: "Could not delete Category with id=" + id
        });
    });

};

exports.deleteAll = (req, res) => {
    Category.destroy({where: {}, truncate: false})
        .then(nums => {
            res.send({message: `${nums} Category were deleted successfully!`});
        }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all categories."
        });
    });
};

exports.findAllPublished = (req, res) => {
    Category.findAll({where: {published: true}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
