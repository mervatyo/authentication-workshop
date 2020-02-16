const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const controllers = require('./controllers/index');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
require('dotenv').config()

// set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main'
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.set('port', process.env.PORT || 3000);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

app.use(controllers);

module.exports = app;
