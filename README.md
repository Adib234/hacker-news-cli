# Demo

![Top score demo](https://media.giphy.com/media/rz6xMnyu96wGBAtExu/giphy.gif)

![Search demo](https://media.giphy.com/media/eC5vwo9I6cFEFtjEdD/giphy.gif)
Sorry this is low quality because I tried it in high quality and the upload would keep on failing

# Intro

This project was inspired by my desire to have something that was a small CLI tool that I can use while I was on my 17 minute Pomodoro break. If anything goes wrong while you use it, please make a pull request and I get back to you as soon as possible.

# Usage

First of all, these are the following ways to get help

```
$ hackernews
$ hackernews -h
$ hackernews --help
```

You can check the newest articles as well as the highest scoring new articles. Theres also search but that takes more than 5 seconds unfortunately.

If you clone this repo, remember to install Elasticsearch and Kibana (if you want access to Dev Tools). Then in your terminal run `elasticsearch` to run an instance of Elasticsearch

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
- To get Elasticsearch setup make sure that you have elasticsearch running on your local machine and if you want access to the Dev Tools then you have to run kibana as well

# Things I should've done

- I remember concatenating two arrays and I just could've done that with the spread operator. The spread operator can do many things which array functions can do. The solution that I should've provided was something like `let i=[...i,...k]`
- For the Elasticsearch database I should've set up a way to dump snapshots to Amazon S3 so that it could return to the previous state it was in and this would make it more resilient and to increase fault tolerance
- I should've maybe used `Promise.all` again when I made multiple axios calls since the asynchronous code over there didn't rely on each other
