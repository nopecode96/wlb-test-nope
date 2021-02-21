const db = require("../models");
const Articles = db.articles;
const Op = db.Sequelize.Op;

// Create and Save a new Articles
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Article
    const params = {
        title: req.body.title,
        longtext: req.body.longtext,
        fid_user: req.body.fid_user,
        published: req.body.published ? req.body.published : false
    };

    // Save Article in the database
    Articles.create(params)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating Article."
            });
        });
};

// Retrieve all Articless from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Articles.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Article."
            });
        });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Articles.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with id=" + id
            });
        });
};

// Update a Article by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Articles.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Article was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Article with id=" + id
            });
        });
};

// Delete a Articles with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Articles.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Article was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Article with id=" + id
            });
        });
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
    Articles.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Articles were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all Articles."
            });
        });
};

// find all published Articles
exports.findAllPublished = (req, res) => {
    Articles.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Articles."
            });
        });
};
