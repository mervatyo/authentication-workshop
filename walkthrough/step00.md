# Step 0 - Project files walkthrough

This project is designed in model-view-controller or **MVC** pattern, it is the same folder structure of the [Express handlebars codealong](https://github.com/foundersandcoders/express-handlebars-workshop) that we did last week, with few tweaks and changes.
 


### 1. controllers folder

This is where we handle our server routes, read and write from the database, decide which response we are going to send back and which page to render for each route.

the functions are exported using the **exports** (the function names are crucial, see link below to find the different between module.exports and exports).


### 2. models folder

This is where we store our "database" in a json file called `db.json`, it has an array of users which we are going to add to it and authenticate from.

#### Important! - in the nodemon.json file we ignore the db.json which means if you try and change something in the file and save the server will not restart.


#### User.model.js:
**do not change this file**
From this file we manipualte the users "table", make sure to read these functions and what they respond or return, since we are going to use them to solve the tasks

### 3. views folder
This is where we store our handlbars's views/layouts/partials/helpers.
later on we will be adding error messages to them to indicate to the user that something has went wrong with his request, or maybe his password in incorrect.


### Installation guide

- fork the repo
- `git clone {your profile repo that you just forked}`
- `npm i`
- `npm run dev` to run the server

### 


## [**next step >>>**](walkthrough/step01.md)
---
## Keywords
* [`The MVC pattern`](https://www.tutorialspoint.com/mvc_framework/mvc_framework_introduction.htm)
* [`module.exports vs. exports`](https://www.freecodecamp.org/news/node-js-module-exports-vs-exports-ec7e254d63ac/)
* [`nodemon.json`](https://www.npmjs.com/package/nodemon#config-files)
