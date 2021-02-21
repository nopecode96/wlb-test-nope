module.exports = app => {
    const Users = require("../controllers/users.controller.js");

    var router = require("express").Router();

    // Create a new Users
    router.post("/", Users.create);

    // Retrieve all Users
    router.get("/", Users.findAll);

    // Retrieve all published Users
    router.get("/published", Users.findAllPublished);

    // Retrieve a single Users with id
    router.get("/:id", Users.findOne);

    // Update a Users with id
    router.put("/:id", Users.update);

    // Delete a Users with id
    router.delete("/:id", Users.delete);

    // Delete all Userss
    router.delete("/", Users.deleteAll);

    app.use("/api/users", router);
};
