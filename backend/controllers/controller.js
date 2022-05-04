const User = require("../models/user.js");

// Get all users
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Create a new user
exports.create = (req, res) => {
  // Empty content error
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Creating user object
  const user = new User({
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
  });

  // Saving new user in database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Update a user by ID
exports.update = (req, res) => {
  // Empty content error
  if (!req.body) {
    res.status(400).send({
      message: "Cannot be empty !"
    });
  }

  // Saving updated user in database
  User.update(req.params.id, new User(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `User with ID: ${req.params.id} not found.`
          });
        } else {
          res.status(500).send({
            message: `Error updating user with ID: ${req.params.id}`
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a user by ID
exports.delete = (req, res) => {
  User.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User with with ID: ${req.params.id} not found.`
        });
      } else {
        res.status(500).send({
          message: `Error deleting user with ID: ${req.params.id}`
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};