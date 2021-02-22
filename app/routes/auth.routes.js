module.exports = app => {
    const Auth = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    // Login user
    router.post("/login", Auth.login);

    // Register user
    router.post("/register", Auth.register);

    router.get("/verification/:code", Auth.verification);


    app.use("/api/auth", router);

};