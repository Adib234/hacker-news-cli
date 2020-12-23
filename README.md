# Intro

This project was inspired by my desire to have something that was a small CLI tool that I can use while I was on my 17 minute Pomodoro break. If anything goes wrong while you use it, please make a pull request and I get back to you as soon as possible.

# Installation

To get started run

```
docker build -t <your username>/hackernews-cli .
docker images # to get the tag name
docker run <your username>/hackernews-cli:<tag name>
```

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

# To Do

- publish to npm
- update readme.md on usage
- autocomplete? progress bar?

```

```
