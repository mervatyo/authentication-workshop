const { findByUsername, addNewUser } = require('../models/users/User.model');
const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
  res.render('login', { activePage: { login: true } });
};
exports.registerPage = (req, res) => {
  res.render('register', { activePage: { register: true } });
};

exports.authenticate = async (req, res) => {
  try {
    //   send back the user that the user does not exist
    // or user has not been found
    const user = await findByUsername(req.body.username);

    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (!result) {
        return res.render('login', {
          activePage: { login: true },
          error: 'Password is incorrect'
        });
      }

      res.render('home', {
        activePage: { home: true },
        signedIn: true,
        username: user.username
      });
    });
  } catch (e) {
    res.render('login', {
      activePage: { login: true },
      error: e.message
    });
  }
};

exports.addUser = (req, res, err) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render('register', {
      activePage: { register: true },
      error: 'Passwords do not match'
    });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.render('register', {
        activePage: { register: true },
        error: error.message
      });
    }

    addNewUser(username, hash)
      .then(() => res.redirect('/login'))
      .catch(() =>
        res.render('register', {
          activePage: { register: true },
          error: error.message
        })
      );
  });
};
