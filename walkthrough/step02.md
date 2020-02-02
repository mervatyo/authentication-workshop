# Step 2 - Verify user

After that we added a user to our database, and hashed their password with bcrypt. now we need to verify the passwords when the user tries to log in


Now the problem is that in out database the passwords are hashed and salted which means it is not easy to compare a regular user's password (`$tronkPassword123`) with it's hashed state (`$2a$10$045/Zc6RrMraKbXdEJuRS.g0KB3iChSj5RP2oUQCzXF/FgLmVbmwW`).

bcrypt provides a solution for this (if you have read the documentation in the last exercise then you might have already noticed the function that does this).


## Tasks:

#### 1. Fetch user's password

The user in the login page will insert his username and password, so that means first of all we need to check if that user actually exists in our database.

- so use the `findByUsername` method to check if the user exists
- if he doesn't send a proper error message (you will need to add that in the login view)
- and if he does for now just console log the hashed password. 

#### 2. Compare passwords

At this stage we have the the username and password that the user name has inserted in the form in our request body. and the user from our database

your Json file should be something similar to this:

- using bcrypt `compare` between the passwords to check if the password that he inserted is correct.
- if it's wrong send a proper message to the user.
- if it is correct then redirect him to the home page. 




### 
Now commit your changes:

```bash
git add .
git commit -m 'enter relevant message'
```


## [**next step >>>**](walkthrough/step01.md)
---


### Learning outcomes
Understand:
+ how important it is to send messages back to the user.
+ how to take a plaintext password and compare it with the hashed one.

Be able to implement the following:
+ compare passwords (using bcrypt.js) to the user input

## Keywords
