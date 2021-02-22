const db = require("../models");
const nodemailer = require("nodemailer");

const Comments = db.comments;
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Comments
exports.create = (req, res) => {

    const fid_article = req.body.fid_article,
        fid_user = req.body.fid_user,
        comment = req.body.comment;

    // Validate request
    if (!fid_article) {
        res.status(400).send({
            message: "Article can not found!"
        });
        return;
    }

    // Validate request
    if (!fid_user) {
        res.status(400).send({
            message: "User can not found!"
        });
        return;
    }

    // Validate request
    if (!comment) {
        res.status(400).send({
            message: "Content can not found!"
        });
        return;
    }

    // Create a Article
    const params = {
        fid_article: fid_article,
        fid_user: fid_user,
        comment: comment,
        published: true
    };

    // Save Article in the database
    Comments.create(params)
        .then(data => {
            // res.send(data);
            console.log(data.fid_user);
            const fid_article_owner = data.fid_user;

            Users.findByPk(fid_article_owner)
                .then(data2 => {
                    const email = data2.email;
                    const transporter = nodemailer.createTransport({ host: 'smtp.zoho.com', auth: { user: 'noreply@lavanda.id', pass: 'Testemail2021' } });
                    const mailOptions = {
                        from: 'noreply@lavanda.id',
                        to: email, subject: 'You got Comment',
                        text: 'Hello,\n\n' + 'You got comment from someone on your article please check on this link : \nhttp:\/\/' + req.headers.host + '.\n' };
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { return res.status(500).send({ msg: err.message }); }
                        res.status(200).send({
                            message: 'A comment notification has been sent to ' + email + '.'
                        });
                    });
                })



        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating Comment."
            });
        });
};

// Retrieve all Commentss from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Comments.findAll({ where: condition })
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

    Comments.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with id=" + id
            });
        });
};

