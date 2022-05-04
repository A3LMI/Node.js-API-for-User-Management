module.exports = app => {
    const users = require("../controllers/controller.js");

    var router = require("express").Router();

    // Get all users
    router.get("/all", users.findAll);

    // Create a new user
    router.post("/add", users.create);

    // Update a user by ID
    router.put("/update/:id", users.update);

    // Delete a user by ID
    router.delete("/delete/:id", users.delete);

    app.use('/users', router);
};