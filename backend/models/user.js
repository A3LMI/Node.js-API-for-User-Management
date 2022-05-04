const sql = require("../config/db.js");

const User = function(user) {
  this.id = user.id;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.password = user.password;
  this.gender = user.gender;
};

User.getAll = (result) => {
  let query = "SELECT * FROM users";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
  });
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("User created succesfully !", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.update = (id, user, result) => {
  sql.query(
    `UPDATE users
     SET id=?, first_name=?, last_name=?, email=?, password=?, gender=?
     WHERE id=?`,
    [user.id, user.first_name, user.last_name, user.email, user.password, user.gender, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("User with id " + id + " updated succesfully !", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.delete = (id, result) => {
  sql.query("DELETE FROM users WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("User with id " + id + " deleted succesfully !");
    result(null, res);
  });
};

module.exports = User;