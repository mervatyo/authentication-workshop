const bcrypt = require("bcrypt");

// use these functions to manipulate our database

const { findByUsername, addNewUser } = require("../models/users/User.model");

exports.loginPage = (req, res) => {
  res.render("login", { activePage: { login: true } });
};
exports.registerPage = (req, res) => {
  res.render("register", { activePage: { register: true } });
};

// This function handles the POST /addUser route
// checks if the password and confirmPassword are equal if not send back
// a proper error message
// hash the password, then add the new user to our database using the v addNewUser method
// make sure to handle any error that might occured
exports.addUser = (req, res, err) => {
  if (req.body.password !== req.body.confirmPassword)
    return res.render("register", { error: "passwords don't match" });
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return res.render("register", { error: err.message });
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      if (err) return res.render("register", { error: err.message });
      addNewUser(req.body.username, hash)
        .then(() => {
          res.render("home");
        })
        .catch((error) => {
          res.render("register", { error: error.message });
        });
    });
  });
};

// this function handles the POST /authenticate route
// it finds the user in our database by his username that he inputed
// then compares the password that he inputed with the one in the db
// using bcrypt and then redirects back to the home page
// make sure to look at home.hbs file to be able to modify the home page when user is logged in
// also handle all possible errors that might occured by sending a message back to the cleint
exports.authenticate = (req, res) => {
  findByUsername(req.body.username)
    .then((data) => {
      console.log("hoon", data);
      const someOtherPlaintextPassword = req.body.password;
      console.log("nnn", req.body.password);
      const hash = data.password;
      bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
        if (err) return res.render("login", { error: err.message });
        if (result == false) {
          return res.render("login", { error: "password incorrect" });
        }
        res.cookie("access_token", req.body.username, {
          httpOnly: true,
          maxAge: 9000,
        });
        res.redirect("/");
      });
    })
    .catch((error) => {
      res.render("login", { error: error.message });
    });
};

exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
};
