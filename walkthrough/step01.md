# Step 1 - Hash a password

In the online world, passwords play a critical role in keeping your data and other important information safe. For this reason, ensuring your passwords remain secure is critical. If not, the consequences can be catastrophic — think the [Sony hacks of 2011](https://en.wikipedia.org/wiki/2011_PlayStation_Network_outage).


### Plaintext Dangers
When storing user passwords, the first consideration is to not store them in plaintext (ie storing the actual password). Some reasons for this:
1. If your user data is compromised, the attackers will not only be able to log in with a user's password, but as people often reuse passwords, the users could also be comprimised elsewhere. prevents escalation of a read only attack
2. The passwords are visible to anyone who has access to the database.

If a website has ever emailed you your password, they are likely to be storing it in plaintext. Unfortunately this is [very common](http://plaintextoffenders.com/).

So when a user is trying to log in, how can you validate their password, if you do not want to store their password? Well, that involves hashing.

---
### What is hashing?
Hashing is when you take one string, (eg a plaintext password), and run an algorithm (e.g. [MD5](https://en.wikipedia.org/wiki/MD5), [SHA256](https://en.wikipedia.org/wiki/SHA-2)) on it which changes it into a different string. A hash function should be fast to execute and slow (or impossible) to reverse.


Hashing is deterministic, meaning every time you run the same algorithm on the same string you will get the same result back. This is why you can store the hashed string in the database and check it against a password that a user may submit through a login form, for example.

---

### What are the different hashing options?

There are several different ways to implement hashing and here is an explanation of them and short examples using Node.js.

__1. Simple hash__

This is somewhat better than storing a plaintext password, but is not that great due to the fact that one computer can compute billions of hashes per second. In fact, huge databases of pre-computed hashes of the most common passwords already exist. These are known as **rainbow tables**. 6.5 million LinkedIn passwords were hacked in 2012. While they were hashed, they were not 'salted' and were therefore eventually all cracked.


__2. Hash with a fixed salt__

This is where you add something known as a **salt**. A salt is a long string of random bytes, added to the password before hashing, to alter the resulting hash. A fixed salt will prevent an attacker using rainbow tables against your hashes. It will also not be possible to brute force the hashes without the salt. However, the salt would be stored in your database or in an environment variable, and if your server has been compromised, it is likely the attacker knows the salt also.

__3. Hash with per user salt__
Generating a new salt for each new hash is another improvement. You create the salt, create the hash, then store both of them in the database together to be used when a user tries to log in. This means that even in the event of an attacker getting a database dump, each password would have to be brute forced individually.

__4. bcrypt__  
bcrypt (paper [here](http://www.openbsd.org/papers/bcrypt-paper.ps)) is a hash function that was specifically designed for passwords, and designed to be _very slow_.

It does this by executing an internal encryption/hash function many times in a loop. bcrypt is 10,000x slower than SHA1. 100ms, for example, is fast enough that the user won't notice when they log in, but slow enough to make brute force attacks against the hash much more expensive.

How long bcrypt takes to execute can actually be configured, by telling it how many 'rounds' of its internal hash function to execute. This number is logarithmic so the execution time increases quite sharply. This makes bcrypt future proof, as while computers get faster, the number of rounds can be increased.

bcrypt has a 'per user salt' feature built into it, and the salt is added to the result string, so there's no need to store the salt and the hashed password separately.

```
// bcrypt string breakdown:
$2a$10$045/Zc6RrMraKbXdEJuRS.g0KB3iChSj5RP2oUQCzXF/FgLmVbmwW

$ 2a        $ 10               $ 045/Zc6RrMraKbXdEJuRS.g0KB3iChSj5RP2oUQCzXF/FgLmVbmwW
$ bcrypt id $ number of rounds $ 128 bit salt         . 184 bit hash
```

## Tasks:

#### 1. Implement the hashing function

We have the register page to add a new user, the form will send a POST request to /addUser, go to that controller and as a start hash the password using bcrypt and console log it to see that everything is working.

#### 2. Saving and redirecting

Using the `addNewUser` method from our model, add the user to our db and then redirect the user to the homepage or render the homepage as a response your choice.

your Json file should be something similar to this:

<img src="https://i.imgur.com/J6wIYzK.png" alt="node-girls-logo" styles="text-align:center;" />


#### 3. Handling and showing errors
The third input in the register form is a confirm password input. what if the it's wrong ? then you will need to render the register page again with an error telling the user what we.

Sub-tasks:

- If password and confirmPassword don't match then show the user an error
- Add the error message in register view, colored red.
- Handle other possbile errors that might occur. (for this check the `addNewUser` method and what it does reject or error on)

for example :
<img src="https://i.imgur.com/iRs9vPi.png" alt="node-girls-logo" styles="text-align:center;" />



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
+ why to avoid storing plaintext passwords
+ why a password should be hashed before being stored
+ which hashing algorithms should be used and why
+ what a 'salt' is and why it is useful
+ how salts should be generated and used
+ how bcrypt works

Be able to implement the following:
+ compare passwords (using bcrypt.js) to the user input

## Keywords
* [`Salt`](https://en.wikipedia.org/wiki/Salt_(cryptography))
* [`Rainbow tables`](https://en.wikipedia.org/wiki/Rainbow_table)
