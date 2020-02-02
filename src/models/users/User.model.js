const fs = require('fs');
const path = require('path');

const USERS_PATH = path.resolve('./src/models/db.json');

const db = require(USERS_PATH);

// !! will turn the value into a boolean
// so if length is 0 then it's converted to false which means user not found
const checkIfUserExists = username => 
  !!db.users.filter(user => user.username === username).length


/**
 * @param  {string} username
 */
exports.findByUsername = username =>
  new Promise((resolve, reject) => {
    // will stop at the first user found
    db.users.forEach(user => {
      if (user.username === username) {
        resolve(user);
      }
    });

    reject(new Error('No user was found'));
  });


/**
 * @param  {string} username
 * @param  {string} password
 */
exports.addNewUser = async (username, password) =>
  new Promise((resolve, reject) => {

    const newUser = {
      username,
      password,
      id: db.users.length
    };

    const newJson = {
      ...db,
      users: [...db.users, newUser]
    };
    
      // if the user exists then do not add him to our database
      if (checkIfUserExists(username)){
        return reject(new Error('User already exists in out database'))
      }

      fs.writeFile(USERS_PATH, JSON.stringify(newJson, null, 2), err => {
        if (err) reject(err);

        resolve('User has been added');
      });
  });
