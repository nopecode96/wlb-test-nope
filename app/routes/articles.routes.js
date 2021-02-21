module.exports = app => {
    const Articles = require("../controllers/articles.controller.js");

    var router = require("express").Router();

    // Create a new Articles
    router.post("/", Articles.create);

    // Retrieve all Articles
    router.get("/", Articles.findAll);

    // Retrieve all published Articles
    router.get("/published", Articles.findAllPublished);

    // Retrieve a single Articles with id
    router.get("/:id", Articles.findOne);

    // Update a Articles with id
    router.put("/:id", Articles.update);

    // Delete a Articles with id
    router.delete("/:id", Articles.delete);

    // Delete all Articless
    router.delete("/", Articles.deleteAll);

    app.use("/api/articles", router);
};
