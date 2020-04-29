# Step 0 - Project files walkthrough

This project is designed in model-view-controller or **MVC** pattern, it is the same folder structure of the [Express handlebars codealong](https://github.com/foundersandcoders/express-handlebars-workshop) that we did last week, with few tweaks and changes.
 


### 1. controllers folder

This is where we handle our server routes, read and write from the database, decide which response we are going to send back and which page to render for each route.

the functions are exported using the **exports** (the function names are crucial, see link below to find the different between module.exports and exports).


### 2. models folder
This folder contains our models (Models sit between your application's logic and the data store itself.) that we use to manipulate our database
> Usually 1 model file = 1 table in the database


#### User.model.js:
**do not change this file**
From this file we manipualte the users table, make sure to read these functions and what they respond or return, since we are going to use them to solve the tasks

### 3. views folder
This is where we store our handlbars's views/layouts/partials/helpers.
later on we will be adding error messages to them to indicate to the user that something has went wrong with his request, or maybe his password in incorrect.


### Installation guide

- fork the repo
- `git clone {your profile repo that you just forked}`
- `npm i`
- Set up the database:
   - Run createdb asgard
   - Run psql or pgcli to enter the pg interactive terminal.
   - Enter CREATE USER heimdall WITH SUPERUSER PASSWORD '123123';
   - Enter \q in psql or pgcli to leave the pg interactive terminal.
   - Run npm run build:db
- `npm run dev` to run the server

### 


## [**next step >>>**](./step01.md)
---
## Keywords
* [`The MVC pattern`](https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm)
* [`module.exports vs. exports`](https://www.freecodecamp.org/news/node-js-module-exports-vs-exports-ec7e254d63ac/)
* [`nodemon.json`](https://www.npmjs.com/package/nodemon#config-files)
