const axios = require("axios");
const _ = require("lodash");
const chalk = require("chalk");

async function getTop() {
  try {
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    );
    const data = await response.data;
    return data;
  } catch (error) {
    alert(error);
  }
}

async function processResults() {
  try {
    const data = await getTop();
    const responses = await Promise.all(
      data.map((id) =>
        axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
      )
    );
    const results = [];
    for (const article of responses) {
      const { title, url, score, type, time } = article.data;
      const dateTime = new Date(time * 1000).toLocaleDateString("en-US");
      const hourTime = new Date(time * 1000).toLocaleTimeString("en-US");

      if (type === "story" && url !== undefined && title !== undefined) {
        results.push({ title, url, score, time, dateTime, hourTime });
      }
    }
    return results;
  } catch (error) {
    console.log(error);
  }
}

function format(data) {
  let sample = _.slice(data, 0, 10).map(({ time, ...article }) => article);
  let count = 1;
  for (const article of sample) {
    const { title, url, score, dateTime, hourTime } = article;
    console.log(
      chalk.green.inverse(`${count}. ${title} (score: ${chalk.red(score)})`)
    );
    const string = "URL:";
    console.log(
      chalk.green(
        `${chalk.yellow.inverse(string)} ${chalk.blue.underline.bold(url)}`
      )
    );
    console.log(chalk.magenta.inverse(`Time: ${hourTime} ${dateTime}`));
    console.log("\n");
    count++;
  }
}

async function sortByScore() {
  try {
    const data = await processResults();
    data.sort((a, b) => (b.score > a.score ? 1 : a.score > b.score ? -1 : 0));
    format(data);
  } catch (error) {
    console.log(error);
  }
}

async function sortByTime() {
  try {
    const data = await processResults();
    data.sort((a, b) => (b.time > a.time ? 1 : a.time > b.time ? -1 : 0));
    format(data);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sortByTime, sortByScore };
