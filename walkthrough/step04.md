# Step04 - Encoding cookies with JWT

Now we have a user logging in and then setting the cookie, and from there we recognize the user through that cookie, but anyone can change that cookie. which is a big security vulnerability.


`Token-based authentication` is a way to authenticate a user. The idea is that upon login we create a token (a string) and store it in a cookie. The browser then sends the token with subsequent requests (since cookies are sent with every request), and if the token can be verified (i.e. it is a legitimate token issued by the server), the user is authenticated.

**would love to have an image here but couldn't find any good ones for tokens :smile: issues are welcomed**

> Note: This token authentication is `stateless`, because no data persists on the server in relation to individual tokens. This is in contrast with stateful sessions, where a `session` is created in a database, and the session id is sent to the browser. Then the browser sends the id with each request, and the server checks in the database to validate the session. Being stateless, `token-based authentication` is less memory-intensive than `session-based authentication`, but both methods also have other pros and cons, which you can read about it online.

## Contents

* [A more useful cookie](#a-more-useful-cookie)
* [Signing](#signing)
* [JSON Web Tokens](#json-web-tokens)
* [exercise 1: creating and validating JWT cookies](#exercise-1-creating-and-validating-jwt-cookies)
* [optional extra exercise 2- implement a HMAC](#optional-extra-exercise-2--implement-a-hmac)

## A more useful cookie

A very simple cookie (key and value) could look like `logged_in=true` or `username=druscilla` but sometimes we want to store more, and better-structured data.

:star: How about JSON? :star:

For example, inside a cookie, it might be useful to store:
1. a user's id, and
2. their access privileges.

We could write in our handler:
```javascript=
const userInformation = {
  userId: 45,
  accessPrivileges: {
    user: true,
    admin: false
  }
};

const cookieValue = JSON.stringify(userInformation);

// Nodejs
res.setHeader(
  'Set-Cookie',
  `data=${cookieValue}; HttpOnly; Secure`
);

// Express
 res.cookie('data', cookieValue, {HttpOnly: true, secure: true});

// the secure flag is to enable cookies only for
// https and not http.
// and HttpOnly is only for webservers
```

Great! We now have a cookie that we can add as much information to as we need, but we still have the same **big security problem**: This cookie can be very easily tampered with. (For example, by opening up the DevTools 'Application' tab and setting `admin` to `true`)

So when our server reads a cookie from an incoming request, **how can we be sure that the cookie has not been edited?**

## Signing

We can use `hashing` in order to know if our cookie has been altered.

However, we need to be sure only we can produce the correct hash. So if an attacker changes the cookie, they cannot produce the correct hash, and we will know the data has changed.

A [HMAC](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code) (Hash-based message authentication code) is a code which authenticates a message using a hash. In other words, it is exactly what we need!

A HMAC requires:
- a `secret`: a long random string which is private,
- a `value`: the message you want to sign, and
- a `mathematical algorithm` to create the hash.

You can store the HMAC alongside the original message to verify that the message/cookie/whatever has not been tampered with. This is known as **signing**.

##### what is a signature?
- Think of the signature like a personal wax seal on a letter- the contents of the letter cannot be changed without breaking the seal, and the correct seal cannot be reproduced without the stamp!

> Note: If you use a [long enough](https://crypto.stackexchange.com/questions/35476/how-long-should-a-hmac-cryptographic-key-be) string as a secret key, with a modern hashing algorithm, the key will be safe from a bruteforce attack with current levels of computing power.

## JSON Web Tokens

This whole 'signed JSON' idea is such a good one that there is an entire open standard associated with it known as [JSON Web Tokens](https://jwt.io/).

JWT uses [base64](https://en.wikipedia.org/wiki/Base64) encoding which is a way of converting binary data into plain text. Encoding _is not_ the same as encrypting so **sensitive information should not be stored within a JWT**. We use JWTs for authentication and transferring data that you don't want to be tampered with.

**A JWT is just a string**, composed of three sections, joined together by full stops. The sections are:

**1. Header** - base64 encoded object about the type of token (jwt) and the type of hashing algorithm (ie HMAC SHA256).
```js
{
  alg: 'SHA256'
  type: 'JWT'
}
```
**2. Payload** - base64 encoded object with your 'claims' in it. Mostly just a fancy name for the data you want to store in your JWT, but it can also hold 'reserved claims', which are some useful standard values, such as `iss (issuer)`, `exp (expiration time)`, `sub (subject)`, and `aud (audience)`.
```js
{
  "name": "John Doe",
  "user": true,
  "admin": false
}
```
**3. Signature** - a hash of parts `1)` and `2)` joined by a full stop.
```js
hashFunction(`${encodedHeader}.${encodedPayload}`);
```

The overall structure of a JWT is:
> [header].[payload].[signature]

Here is an example of a JWT:
> eyJhbGciOiJIUzI1NiJ9.aGtqa2hr.IhQxjhZL2hMAR2MDKTD1hppR8KEO9cvEgsE_esJGHUA


So to build it in Node.js:
```javascript=
const base64Encode = str =>
  Buffer.from(str).toString('base64');

const base64Decode = str =>
  Buffer.from(str, 'base64').toString();

// Usually two parts:
const header = {
  alg: 'SHA256', // The hashing algorithm to be used
  typ: 'JWT' // The token 'type'
};

// Your 'claims'
const payload = {
  userId: 99,
  username: 'ada'
};

const encodedHeader = base64Encode(JSON.stringify(header));
const encodedPayload = base64Encode(JSON.stringify(payload));

const signature = hashFunction(`${encodedHeader}.${encodedPayload}`);

// 'Udcna0ETPpRw5m3po3COjicb_cGJvgtnoLZyLnftaaI'

const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;

// Result!
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvayI6dHJ1ZSwiaWF0IjoxNTAxOTY2MjY5fQ.Udcna0ETPpRw5m3po3COjicb_cGJvgtnoLZyLnftaaI'
```


So to build it in Express:

```javascript=
const jwt = require('jsonwebtoken');

jwt.sign(dataToEncode, process.env.JWT_SECRET, function(err, token) {
  if (err) {
    // handle error
  }

  console.log(token)
});

// Result!
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvayI6dHJ1ZSwiaWF0IjoxNTAxOTY2MjY5fQ.Udcna0ETPpRw5m3po3COjicb_cGJvgtnoLZyLnftaaI'
```




This JWT is protected from tampering, because it is signed. The payload and header are base64 encoded (to reduce the length), but they can easily be converted back to plain text- **their contents are not secret**. So **do not store sensitive user information in a JWT being sent as a cookie**, such as bank balance, DOB etc. To protect the information from being read, you would need to encrypt it, but in general, it is advised to **never store sensitive data on a cookie.**

---

# Tasks:

#### 1. Sign a cookie on login.

Right now the value of our cookie `access_token` is `user.username` instead let's change it to the signed value of `user.username`.

- First create a `.env` file that has a variable `JWT_SECRET` that equals to a secret of your choice.
- then in our auth controller, import the `jsonwebtoken` package and use it to sign `user.username`.
- then set the cookie `access_token` equals to the value of the jwt token that we created.
- Don't forget to handle the error of jwt sign method.


> checkout [jsonwebtoken documentation](https://www.npmjs.com/package/jsonwebtoken)

#### 2. Verify a JWT token

Cool, so now we need to verify this token, in the home controller again using a method from `jsonwebtoken` (check the documentation above)

- in home.js:
    - first check if the cookie exists at all (we already did this in the step04)
    - then verify the token using `jsonwebtoken` package
    - in case there is an error render the error page


---


### 
Now commit your changes:

```bash
git add .
git commit -m 'enter relevant message'
```


## [**next step >>>**](walkthrough/step05.md)
---

### Learning outcomes

- Understand the idea of token-based authentication
- What is digital signing?
- What are JSON Web Tokens (JWTs)?
- How to implement token-based authentication using `jsonwebtoken`
