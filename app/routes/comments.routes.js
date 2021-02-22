module.exports = app => {
    const { authentication } = require('../middlewares/auth');
    const Comments = require("../controllers/comments.controller.js");

    var router = require("express").Router();

    // Create a new Comments
    router.post("/", authentication, Comments.create);

    // Retrieve all Comments
    router.get("/", Comments.findAll);

    // Retrieve a single Comments with id
    router.get("/:id", Comments.findOne);


    app.use("/api/comments", router);
};
