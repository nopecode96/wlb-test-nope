const db = require("../models");
const md5 = require("md5");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { generateJwt } = require('../helpers/jwt');
const Users = db.users;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
    const email = req.body.email,
        pass = req.body.password;

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

    const condition = {email: email, password: md5(pass)};


    Users.findAll({ where: condition })
        .then(data => {
            if(!data){
                console.log('loading....2')
                res.status(400).send({
                    message: "Your email not found"
                });
            } else {
                const token = generateJwt({id: data[0].id, email: data[0].email});
                res.status(200).json({
                    token: token
                })
            }
        })
        .catch( err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while login."
            });
        });

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
        email           : email,
        password        : md5(pass),
        full_name       : fullName,
        activated_url   : crypto.randomBytes(16).toString('hex'),
        activated       : req.body.activated ? req.body.activated: false
    };

    const condition = { email: email };

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
                       const transporter = nodemailer.createTransport({ host: 'smtp.zoho.com', auth: { user: 'noreply@lavanda.id', pass: 'Testemail2021' } });
                       const mailOptions = {
                           from: 'noreply@lavanda.id',
                           to: data.email, subject: 'Account Verification Token',
                           text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/auth\/verification\/' + data.activated_url + '.\n' };
                       transporter.sendMail(mailOptions, function (err) {
                           if (err) { return res.status(500).send({ msg: err.message }); }
                           res.status(200).send({
                               message: 'A verification email has been sent to ' + data.email + '.'
                           });
                       });
                   })
                   .catch(err => {
                       res.status(500).send({
                           message:
                           err.message || "Some error occurred while creating User."
                       });
                   });
           }
        })
        .catch( err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating User."
            });
        });

};

exports.verification = (req, res) => {
    const code = req.params.code;
    const condition = { activated_url: code };

    Users.findAll({where: condition})
        .then(data => {
            if(data.length == 0){
                res.status(400).send({
                    message: "Your Verification Code can't found"
                });
            } else if(data[0].activated_url !== code){
                res.status(400).send({
                    message: "Your Verification URL is not Valid"
                });
            } else {
                Users.update({activated: true, activated_url: ''}, {where: condition})
                    .then(num => {
                        if (num == 1) {
                            res.send({
                                message: "Your account has been verified. You can login until right now"
                            });
                        } else {
                            res.send({
                                message: `Can't verify your account`
                            });
                        }
                    })
            }
        })


};