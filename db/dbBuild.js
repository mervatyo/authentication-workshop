const { QueryFile } = require('pg-promise');
const path = require('path');
const db = require('./dbConnection');

const sql = (file) =>
  new QueryFile(path.join(__dirname, file), { minify: true });

const build = sql('./build.sql');

db.query(build)
  .then((res) => {
    console.log('Database built');
    db
    .query('INSERT INTO users (username, password) VALUES ($1, $2)', ['awdasd', 'asdasd'])
    .then((exists) => {
      
      console.log(exists)
    }).catch(console.log)
    // process.exit()
  })
  .catch((e) => console.error('error', e));
