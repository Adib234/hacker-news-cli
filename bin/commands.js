#!/usr/bin/env node
const program = require("commander");
const _ = require("lodash");
const { sortByTime, sortByScore } = require("../src/main");

program
  .name("hackernews")
  .version("1.0.0")
  .description("Bite-sized Hackernews CLI to check out on your coffee break")
  .usage("[command] [option(s)]");

// Command for displaying the top 10 articles by score of the top 500 stories
program
  .command("top-score")
  .alias("ts")
  .description("Returns the top 10 articles by score")
  .option(
    "-d, --date",
    "Makes sure that it's a top article specified by particular date"
  )
  .action(sortByScore);

// // Command for displaying the top 10 newest articles of the top 500 stories
program
  .command("top-time")
  .alias("tt")
  .description("Returns the top 10 newest articles")
  .option(
    "-s, --score",
    "Top 10 newest articles are sorted by score",
    async function score(sortByTime) {
      await _.sortBy(sortByTime, ["score"]);
    }
  )
  .action(sortByTime);

program.parse(process.argv);
