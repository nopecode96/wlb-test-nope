module.exports = app => {
    const { authentication } = require('../middlewares/auth');
    const Articles = require("../controllers/articles.controller.js");

    var router = require("express").Router();

    // Create a new Articles
    router.post("/", authentication, Articles.create);

    // Retrieve all Articles
    router.get("/", Articles.findAll);

    // Retrieve all published Article
    router.get("/published", Articles.findAllPublished);

    // Retrieve a single Article with id
    router.get("/:id", Articles.findOne);

    // Update a Article with id
    router.put("/:id", authentication, Articles.update);

    // Delete a Article with id
    router.delete("/:id/:fid_user", authentication, Articles.delete);

    app.use("/api/articles", router);
};
