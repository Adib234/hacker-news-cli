const axios = require("axios");
const chalk = require("chalk");
const { Client } = require("es7");
const client = new Client({ node: "http://localhost:9200" });

function format(data) {
  let count = 1;
  for (const article of data) {
    const { title, url, score, time } = article._source;
    const dateTime = new Date(time * 1000).toLocaleDateString("en-US");
    const hourTime = new Date(time * 1000).toLocaleTimeString("en-US");
    console.log(
      chalk.green.inverse(`${count}. ${title} (score: ${chalk.red(score)})`)
    );
    const string = "URL:";
    console.log(
      chalk.green(
        `${chalk.yellow.inverse(string)} ${chalk.blue.underline.bold(
          url !== undefined ? url : "No url :("
        )}`
      )
    );
    console.log(chalk.magenta.inverse(`Time: ${hourTime} ${dateTime}`));
    console.log("\n");
    count++;
  }
}

async function getStories() {
  try {
    const topStories = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    );
    const topStoriesData = await topStories.data;

    const newStories = await axios.get(
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    );
    const newStoriesData = await newStories.data;

    const bestStories = await axios.get(
      "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"
    );
    const bestStoriesData = await bestStories.data;

    const askStories = await axios.get(
      "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty"
    );
    const askStoriesData = await askStories.data;

    const showStories = await axios.get(
      "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty"
    );
    const showStoriesData = await showStories.data;

    const jobStories = await axios.get(
      "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty"
    );
    const jobStoriesData = await jobStories.data;

    return {
      1: topStoriesData,
      2: newStoriesData,
      3: bestStoriesData,
      4: askStoriesData,
      5: showStoriesData,
      6: jobStoriesData,
    };
  } catch (error) {
    alert(error);
  }
}

async function run(query) {
  // if you run this for the first time, you might have to comment this out since this index must be created first
  await client.indices.delete({
    index: "hackernews",
  });
  await client.indices.create({
    index: "hackernews",
    body: {
      mappings: {
        properties: {
          by: {
            type: "text",
          },
          score: { type: "integer" },
          text: { type: "text" },
          time: { type: "date" },
          title: { type: "text" },
          url: {
            type: "text",
          },
        },
      },
    },
  });

  const idsObject = await getStories();

  let ids = []; // this will contain all stories id

  for (let id in idsObject) {
    ids = ids.concat(idsObject[id].slice(0, 100));
  }

  const responses = await Promise.all(
    ids.map((id) =>
      axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      )
    )
  );

  for (const piece of responses) {
    await client.index({
      index: "hackernews",
      body: {
        by: piece?.data?.by,
        score: piece?.data?.score,
        text: piece?.data?.text,
        time: piece?.data?.time,
        title: piece?.data?.title,
        url: piece?.data?.url,
      },
    });
  }

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: "hackernews" });

  //Let's search!
  const { body } = await client.search({
    index: "hackernews",
    body: {
      from: 0,
      size: 11,
      query: {
        multi_match: {
          query: query,
          fields: ["title", "text"],
          type: "most_fields",
        },
      },
    },
  });

  format(body.hits.hits);
}

module.exports = { run };
