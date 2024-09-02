/** @format */

const express = require("express");
const app = express();
app.get("/heavytask", (req, res) => {
	let counter = 0;
	for (let i = 0; i < 100000000000; i++) {
		counter++;
	}
	res.send(`Task completed in ${counter} iterations`);
});

app.get("/lighttask", (req, res) => {
	res.send("Lightweight task completed");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`indexjs running on port ${port}`);
});
