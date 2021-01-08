# Intro

This project was inspired by my desire to have something that was a small CLI tool that I can use while I was on my 17 minute Pomodoro break. If anything goes wrong while you use it, please make a pull request and I get back to you as soon as possible.

# Usage

First of all, these are the following ways to get help

```
$ hackernews
$ hackernews -h
$ hackernews --help
```

# New things I learned

- Use `Promise.all` on an iterable like array or map instead of doing things sequentially which boosted my performance in this case by 60x
- When you use the debugger in VSCode make sure to call the function and then create the breakpoint at the value you return
  ![](res/2020-12-14-21-03-23.png)
- It took me a long time to figure out how to have my program run by my specified command instead of `node [filename].js`, just put your commands in a `bin` folder and then specifiy in `package.json` `bin:{[custom-command]:'./bin/[filename].js}`
- To not modify the original array and delete a key you can use map to deconstruct the object and pick out the one that you don't want `const newArray = array.map(({ bad, ...item }) => item);`, the reason why `delete` didn't work at first because I was using an array. If I were to still use `delete` which isn't recommended since it's one of the [worst optimization killers](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#521-objects-that-are-in-hash-table-mode-aka-normalized-objects-dictionary-mode---objects-who-have-a-hash-table-as-a-backing-data-structure-are-not-simple-enumerables) I would have to iterate each object through a for loop or using `forEach`
- If you make changes in package.json and you are building a CLI, make sure to uninstall your program and install it again
- Something really cool I did was when I was trying to search for examples for using the Node.js client for Elasticsearch, the filenames was this big string with a bunch of random numbers and letters. So what I did was I cloned the repo and the did `grep [whatever command I'm interested in seeing an example of] *` and just like that I found the examples! I love Unix <3
- I really wanted to have all the stories available on my Elasticsearch index but 26 million is a big number for Javascript, I kept on getting the error `heap ran out of memory`, so then I tried 1500 but that was an ugly number for hackernews, so now I use only about 500
- I was getting this weird error `cannot read property of undefined` and the quickest fix is to put a ? for every property except the last one. ? or also known as the null propagation operator/optional chaining operator is a way of short circuiting in an object if the property is null or undefined and making it equal to or returning undefined.

# To Do

- Implement a search engine
- Figure out how to make use of flags
- Some useful links if we go choose Redis
  - https://static.simonwillison.net/static/2010/redis-tutorial/
  - https://redis.io/topics/data-types-intro
  - https://stackoverflow.com/questions/7535184/when-to-use-a-key-value-store-such-as-redis-instead-along-side-of-a-sql-database#:~:text=Since%20redis%20is%20rather%20memory,versatility%20to%20many%20other%20scenarios.
