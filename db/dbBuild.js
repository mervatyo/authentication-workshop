const { QueryFile } = require('pg-promise');
const path = require('path');
const db = require('./dbConnection');

const sql = (file) =>
  new QueryFile(path.join(__dirname, file), { minify: true });

const build = sql('./build.sql');

db.query(build)
  .then(() => {
    console.log('Database built');

    process.exit()
  })
  .catch((e) => console.error('error', e));
