const db = require("../models");
const md5 = require("md5");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
    const email = req.body.email,
        pass = req.body.password,
        token = jwt.sign({ foo: 'bar' }, pass);



    if (!email) {
        res.status(400).send({
            message: "Email can not be empty!"
        });
        return;
    }

    if(!pass) {
        res.status(400).send({
            message: "Password can not be empty!"
        });
        return;
    }



};

exports.register = (req, res) => {
    const email = req.body.email,
        pass = req.body.password,
        repass = req.body.repassword,
        fullName = req.body.full_name;

    if (!email) {
        res.status(400).send({
            message: "Email can not be empty!"
        });
        return;
    }

    if(!pass) {
        res.status(400).send({
            message: "Password can not be empty!"
        });
        return;
    }

    if(!repass) {
        res.status(400).send({
            message: "Re-Password can not be empty!"
        });
        return;
    }

    if(repass !== pass) {
        res.status(400).send({
            message: "Password not match!"
        });
        return;
    }

    if (!fullName) {
        res.status(400).send({
            message: "Name can not be empty!"
        });
        return;
    }

    const params = {
        email           : req.body.email,
        password        : md5(req.body.password),
        full_name       : req.body.full_name,
        activated_url   : crypto.randomBytes(16).toString('hex'),
        activated       : req.body.activated ? req.body.activated: false
    };

    var condition = { email: email };

    //Check Email exist
    Users.findAll({ where: condition })
        .then(data => {
           //console.log(data);
           if(data.length !== 0){
               if(data[0].email == email){
                   res.status(400).send({
                       message: "Your email exist"
                   });
               }

           } else {
               // Save User in the database
               Users.create(params)
                   .then(data => {
                       var transporter = nodemailer.createTransport({ host: 'smtp-pulse.com', auth: { user: 'nopecode96@gmail.com', pass: 'ARZ6aDdRAAcGr' } });
                       var mailOptions = {
                           from: 'no-reply@lavanda.id',
                           to: data[0].email, subject: 'Account Verification Token',
                           text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/verify\/' + data[0].activated_url + '.\n' };
                       transporter.sendMail(mailOptions, function (err) {
                           if (err) { return res.status(500).send({ msg: err.message }); }
                           res.status(200).send('A verification email has been sent to ' + data[0].email + '.');
                       });
                   })
                   .catch(err => {
                       res.status(500).send({
                           message:
                           err.message || "Some error occurred while creating Article."
                       });
                   });
           }
        })
        .catch( err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating Article."
            });
        });




};