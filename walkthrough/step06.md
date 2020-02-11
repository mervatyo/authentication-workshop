# Step06 - Async/Await :tada: 

Last week we learned about promises and how they are more readable than callbacks and so better to use.

But promises can get ugly when you chain them or when you want to run multiple promises at the same time, so what if we can use promises that are even easier to read and easier to maintain ?.

This is were Async/Await comes in, the async and await keywords are syntactic sugar for Promises. They aid in presenting the asynchronous code in a synchronous way. They introduce no new concepts, but they change the way that promise-based code is written.

>Note: Async/Await is ES7 so it's not supported by all browsers yet. but it is supported in NodeJs.

## Before/after async/await

Here is some code that uses plain Promises:

```javascript=
const doAsynchronousStuff = ...; // function that returns a Promise

function doAsync() {
    doAsynchronousStuff()
        .then(result1 => {
          return doAsynchronousStuff(result1);
        })
        .then(result2 => {
          return doAsynchronousStuff(result2);
        })
        .then(result3 => {
          return doAsynchronousStuff(result3);
        })
        .then(result4 => {
            // handle response             
        })
        .catch(e => {
          // handle the error
        });
}
```

But with Async/Await our code looks like this:

```javascript=

async function doAsync() {
    try {
      const result1 = await doAsynchronousStuff();
      const result2 = await doAsynchronousStuff(result1);
      const result3 = await doAsynchronousStuff(result2);
    // handle response       
    } catch (e) {
      // handle the error
    }
} 

```

Promises are an incredibly important part of JavaScript. It allows us to hook into the completion of asynchronous calls, making chained asynchronous operations simple.

In order to write Async/Await you need to add:
1. the `async` keyword before the function declaration, for example:

```javascript=
async function runMe() {
    // Some code here    
}
```

or 

```javascript=
const runMe = async () => {
    // Some code here    
}
```

2. add the `await` keyword before the pending promise and assign it into a variable

```javascript=
const runMe = async () => {
    const result = await fetchData()
}
```

3. you need to wrap the `await` statement with `try {} catch {}`, cause if an error occurs the `await` keyword **throws** the error, so we need to catch it.

```javascript=
const runMe = async () => {

  try {
       const result = await fetchData()
   
   } catch(error) {
   
       // handle fetchData error here       
   }
}
```



# Tasks:

We only have 2 functions that use promises in our code base `addNewUser` and `findByUsername`, so let's refactor them into Async/Await !

- Refactor current promises to Async/Await.

---


### 
Now commit your changes:

```bash
git add .
git commit -m 'enter relevant message'
```


---

### Learning outcomes

- What is Async/Await ?.
- How do we use Async/Await ?.
- Benefits of Async/Await.

### Useful links

- [More on Async/Await](https://dev.to/joannatomassoni/a-beginner-s-guide-to-async-await-1a39)
