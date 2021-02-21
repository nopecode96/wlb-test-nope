module.exports = app => {
    const Auth = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    // Create a new Users
    router.post("/register", Auth.register);


    app.use("/api/auth", router);

};