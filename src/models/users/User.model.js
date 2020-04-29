const fs = require('fs');
const db = require('../../../db/dbConnection');

// !! will turn the value into a boolean
// so if length is 0 then it's converted to false which means user not found
const checkIfUserExists = (username) =>
  !!db.users.filter((user) => user.username === username).length;

/**
 * @param  {string} username
 */
exports.findByUsername = (username) =>
  new Promise((resolve, reject) =>
    db
      .query('SELECT * FROM users WHERE username = $1', username)
      .then((user) => {
        if (!user.length) {
          reject(new Error('No user was found'));
        }

        resolve(user[0]);
      })
      .catch((error) => {
        console.log(`findByUsername Error: ${error}`);
        reject(new Error('An error has occurred in the db, findByUsername'));
      })
  );

/**
 * @param  {string} username
 * @param  {string} password
 */
exports.addNewUser = async (username, password) =>
  new Promise((resolve, reject) =>
  // EXISTS returns the following [ { exists: BOOLEAN } ]
    db
      .query('SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)', username)
      .then(([{ exists }]) => {

        if (exists) {
          return reject(new Error('User already exists in our database'));
        }

        // adds the user to the db
        db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
          username,
          password,
        ]).then(() => resolve('User has been added'));

      })
      .catch((error) => {
        console.log(`addNewUser Error: ${error}`);
        reject(new Error('An error has occurred in the db, addNewUser'));
      })
  );
