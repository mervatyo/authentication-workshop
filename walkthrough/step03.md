# Step 03 - Make access tokens


:cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie:


### Remembering the browser

So now that you know how to [store a user's password safely](https://github.com/foundersandcoders/ws-password-management), the question is: just how *does* your server remember a browser?

A [cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) is a **piece of data** that your server, hosted on a certain domain (`localhost`, `google.com` etc) sends back to the browser, which the browser will then keep, and attach to every future request _to that domain_. An `amazon.com` cookie will not be attached to a request to an `ebay.com` domain, for example.

(If you open up DevTools, and go to the 'Application' tab you will be able to see all the cookies attached to the domain you are currently on.)

![dev tools cookies](https://user-images.githubusercontent.com/9598261/32705742-2166ff4e-c80f-11e7-84a8-2212ce48236c.gif)

<br><br>

:cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie:

<br><br>

### How to make cookies

![baking cookies](https://user-images.githubusercontent.com/22657280/32729448-b8d821a2-c87b-11e7-917e-7617d83c6722.gif)

Cookies are attached to the server response using the **`Set-Cookie` header**.

In Node.js, you set headers using the `res.setHeader` and `res.writeHead` methods. (`setHeader` lets you set one header at a time, `writeHead` lets you set your response code and multiple headers at the same time.)

and in ExpressJs you set and read cookies using the [cookie-parser module](https://www.npmjs.com/package/cookie-parser), so to set them you use the `res.cookie` method.

(NB: All servers use headers to communicate with the browser, not just Node.js.)
```javascript
// NodeJs
res.setHeader('Set-Cookie', 'logged_in=true');

// OR

res.writeHead(200, { 'Set-Cookie': 'logged_in=true' });
```

```javascript
// Express
 res.cookie('logged_in', true);
```
Cookies are useful as they allow us to store information about a client. As the client keeps hold of the cookie the server can simply check the cookies has the correct information. You **send** cookies to the frontend via the response object in the ```'Set-Cookie'``` header and **read** a clients cookie on server using :
- NodeJs: ```request.headers.cookie```.
- ExpressJs: ```req.cookies```.
<br><br>

:boom: WARNING :boom:

Here we are setting a very simple cookie with a key of `logged_in` and a value of `true`. It will do for now as we are focusing purely on how to transmit cookies, but in reality there are two problems.

1. If you have multiple users, there is no way of telling the difference between them.
2. There is NO SECURITY in place. Cookies can very easily be edited in Devtools. For example, if you have a cookie of `admin=false`, it is very easy to change that to `admin=true`! The different ways to protect cookies from tampering will be in workshop 3...

:star2: WARNING OVER :star2:

<br><br>

:cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie:

<br><br>

### Cookie flags
You can also add 'flags' to the cookie header to enable certain behaviour. Some of the more important ones are:

Flag | Description
---|---
`HttpOnly` | This stops your cookie being accessed by the browser's Javascript (**including your own front-end code**). Without this flag, an attacker could intercept the user's cookies in a process known as Cross-Site Scripting (XSS). With the cookies of the legitimate user at hand, the attacker is able to act as the user in his/her interaction with a website - effectively identity theft.
`Secure` | This means the cookie will only be set over a HTTPS connection. This prevents a man-in-the-middle attack.
`Max-Age` | This sets the cookie lifetime in seconds.

More flags can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie).

So to improve our cookie a bit we can try:

```javascript
NodeJs
res.setHeader('Set-Cookie', 'logged_in=true; HttpOnly; Max-Age=9000');

// OR

res.writeHead(200, { 'Set-Cookie': 'logged_in=true; HttpOnly; Max-Age=9000' });
// Notice the second parameter is an object, and can be used to set multiple headers.
```

```javascript
// ExpressJs
res.cookie('logged_in', true, { httpOnly: true, maxAge: 9000 });
```

*We've not included ```Secure``` as this repo is running a HTTP server. If we were running a HTTPS server this would be a great flag to include!*

<br><br>

:cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie:

<br><br>

### Reading cookies
Now every time that browser makes a request to your server, it will then send the cookie along with it:
```javascript
// NodeJs
req.headers.cookie; // 'logged_in=true'
```
```javascript
// ExpressJs
req.cookies; // { logged_in: true }
```
This is what you will be looking for in order to grant users access, send back private information etc.

<br><br>

:cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie:

<br><br>

### Removing cookies
![Three Cookie](https://media.giphy.com/media/EKUvB9uFnm2Xe/giphy.gif)

There are a couple of ways to delete a cookie:
1. Overwriting the value.
2. Setting the age to 0.

(Note: in Express we just use the `clearCookie` method)

```javascript
// NodeJs
// Here we are doing both.
res.setHeader('Set-Cookie', 'logged_in=blah; Max-Age=0');
```


```javascript
// ExpressJs
res.clearCookie('logged_in');
```


<br><br>

:cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie: :cookie:

<br><br>

## Tasks:

#### 1. Add a cookie on log in.

As mentioned above we use cookies to remember a browser/user, right now when a user successfully logs in he is redirected to the home page and that's, so let's use cookies to indicate to the user that he is logged in to our website.


- Once a user has successfully logged in, set a cookie  that contains his username.
> We will encrypt this cookie in the future so we don't let the user manipulate the cookie.
- give the cookie the name `access_token`
- then where we render the home page (home.js controller), check if the cookie `access_token` exists.
    - if it does then instead of `Welcome to Asgard's gates.` show `Hello there, {username}` (check the home.hbs file for more details on how to do this)
    - else just how the initial message

example for when a successful login occurs:
<img src="https://i.imgur.com/NeBuwqL.png" alt="" styles="text-align:center;" />

#### 2. Remove a cookie

Users that use our website will want the ability to log out of the website, so we need to remove the cookie when that happens

- Add an `a` tag next to the username in the home page which redirects to `/logout`.
- in the logout function in the `auth.js` file remove the cookie and redirect back to the homepage.
> This time in the homepage you will not see `Hello there, {username}` instead you'll see the intial message `Welcome to Asgard's gates.`

---


### 
Now commit your changes:

```bash
git add .
git commit -m 'enter relevant message'
```


## [**next step >>>**](walkthrough/step04.md)
---


### Learning outcomes
Understand:
- What are cookies?
- Why do we use them?
- How do we set and remove cookies in both NodeJS and ExpressJS?
- How do we check whether or not a request contains a cookie?

