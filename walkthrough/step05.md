# Step05 - Auth middleware

Now that we have our user passwords secured using bcrypt, and our cookies encoded with JWT, we can safley say that we took a step forward into having a secured website.

There are many more steps that we can take to secure our website properly(links would be available at the bottom), but for now this is a good basis.

:lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock: :lock:

Right now the only place where we check if the user is logged in and valid is in the homepage, what if we wanted to check if he is logged in 10 different other routes ?
Should we write the same code for different routes? 
**No** because then it is not DRY (Don't Repeat Yourself) code, remember that you should be encapsulating code when you can :sparkles: 

That's where Express middleware comes in, we had a brief introduction about middleware last week using:
- body-parser
- express static handler
- compression
- logger middleware
- etc.


### What are middlewares ?

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.


Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response - objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

&nbsp;

<img src="https://miro.medium.com/max/1142/1*fbe04fcynkBuLo_CADxxHQ.png" alt="" />

### An example of a application level middleware

```javascript=

// middleware logging timestamp before handling requests
app.use((req, res, next) => {
  console.log(Date.now(), 'before');
  next();
});

// handle '/' get requests with 'hello world'
// and pass control to the next middleware
app.get('/', (req, res, next) => {
  res.send('Hello world');
  next();
});

// middleware logging timestamp after handling requests
app.use((req, res) => {
  console.log(Date.now(), 'after');
});

```

since express runs synchronously it will always run 
```javascript=
app.use((req, res, next) => {
  console.log(Date.now(), 'before');
  next();
});

```

first and the `next()` will call the next middleware, which in this case is the `app.get`

Now let's see a different example

### An example of route specific middleware

```javascript=

const validateNewUser = (req ,res, next) => {
    const {username, password, confirmPassword } = req.body
    
    // if username and password are empty end the request    
    if (!password && !username) {
        return res.send('Please insert a username and a password')
    }

    //  if password and confirmPassword are not identical end the request   
    if (password !== confirmPassword) {
        return res.send('Passwords do not match')
    }
    
    // else continue to the next middleware 
    next()
    
}

app.post('/create-user', validateNewUser, (req, res, next) => {

    // Add new user to our database
    // and end request    
});

```

In this example the `validateNewUser` middleware is the second argument for `app.post`, you can have as many functions or middlewares as you want. for example:

```javascript=

app.post('/create-user', validateNewUser, anotherMiddleware, andAnother, (req, res, next) => {

    // Add new user to our database
    // and end request    
});

```

Or you can have them in an array:
 
```javascript=
app.post('/create-user', [validateNewUser, anotherMiddleware, andAnother], (req, res, next) => {

    // Add new user to our database
    // and end request    
});

```

**important**: all of the middlewares above need to either run the `next` method or end the request. so your server does not hang.

Middlewares are very powerful when your servers get really big and you don't want to repeat yourself, it is totally valid and even encouraged to have a folder just for your middlewares.

# Tasks:

#### 1. build the auth middleware

Let's use what we learned about middlewares above to implement an auth middleware that checks if there is an actual cookie and if it's valid.

- we have a middlewares folder with an index file, create an `authCheck` file that exports a function.
- in the `authCheck` file take the code from `home.js` that checks for the cookie and validates it.
> Note: you do not want to render the home page if the cookie is valid or not valid in the middleware, you need to let our home controller handle the page rendering.
- if everything is fine and valid, set the username to the username that was stored in the cookie and set signedIn to true using [res.locals](https://expressjs.com/en/4x/api.html#res.locals).
-  if he is not logged in set username to be null and signedIn to be false, after all that run the `next` method to go to the next middleware or controller.
- then in the `middlewares/index.js` folder import `authCheck` and export it within an object.
- and then add that middleware before our home controller. using the [example of route specific middleware above](#An-example-of-route-specific-middleware).
- From there [fetch our username variable](http://expressjs.com/en/api.html#app.get) and signedIn variable and pass it to our hbs page.
- if an error occured also pass it in the `res.locals` so the home page can handle the proper rendering.
We should have the same functionality as the last step but this time we can easly reuse our authCheck before any route.


#### 2. Implement login time middleware

We want to track when the user logged in to the website, by logging the date and time in which he logged it

(https://www.npmjs.com/package/winston#quick-start).
- create middleware specifically for the `authenticate` route that apppends the time and date (and the username) in which the user has logged in to a log file.
- You can either use Node's `fs` module to write the log files or for an extra challenge try to use [Winston]
- the middleware can run before or after the logout controller your decision.
> Note: keep your logs in a `logs` folder to keep the folder structure for your project neat and clean.
---


### 
Now commit your changes:

```bash
git add .
git commit -m 'enter relevant message'
```


## [**next step >>>**](walkthrough/step06.md)
---

### Learning outcomes

- To undestand what is a middleware.
- Different ways we can use middlewares,
- Split our code into different middlewares.
- how to use them.

### Useful links

- Secure our website
    - [use HTTTPS instead of HTTP](https://www.howtogeek.com/181767/htg-explains-what-is-https-and-why-should-i-care/)
    - [CAPTCHAs](https://internet.com/website-building/how-to-add-a-captcha-to-your-website/)
    - [Validate your incoming data](https://www.sitepoint.com/validate-your-input/)

- [Express middlewares](https://expressjs.com/en/guide/using-middleware.html)
- [Why logging is important?](https://www.syslog-ng.com/community/b/blog/posts/why-logging-is-important)
