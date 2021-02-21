module.exports = app => {
    const Comments = require("../controllers/comments.controller.js");

    var router = require("express").Router();

    // Create a new Comments
    router.post("/", Comments.create);

    // Retrieve all Comments
    router.get("/", Comments.findAll);

    // Retrieve all published Comments
    router.get("/published", Comments.findAllPublished);

    // Retrieve a single Comments with id
    router.get("/:id", Comments.findOne);

    // Update a Comments with id
    router.put("/:id", Comments.update);

    // Delete a Comments with id
    router.delete("/:id", Comments.delete);

    // Delete all Commentss
    router.delete("/", Comments.deleteAll);

    app.use("/api/comments", router);
};
