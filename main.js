axios = require("axios");

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
			if (type === "story" && url !== undefined && title !== undefined) {
				results.push({ title, url, score, time });
			}
		}
		return results;
	} catch (error) {
		panic(error);
	}
}

// could sort and give top x amount
async function sortByScore() {
	try {
		const data = await processResults();
		data.sort((a, b) => (b.score > a.score ? 1 : a.score > b.score ? -1 : 0));
		return data;
	} catch (error) {
		panic(error);
	}
}

async function sortByTime() {
	try {
		const data = await processResults();
		data.sort((a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0));
		return data;
	} catch (error) {
		console.log(error);
	}
}

sortByTime();

// once we display the results we want to convert the unix timestamp
