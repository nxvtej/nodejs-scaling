/** @format */

const express = require("express");
const os = require("os");
const cluster = require("cluster");

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);
	const numCPUs = os.cpus().length;

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	const app = express();

	app.get("/heavytask", (req, res) => {
		let counter = 0;
		while (counter < 10000000000) {
			counter++;
		}

		res.send(`Task completed in ${counter} iterations done by ${process.pid}`);
	});

	app.get("/lighttask", (req, res) => {
		res.send(`Lightweight task completed by ${process.pid}`);
	});

	const port = 3000;
	app.listen(port, () => {
		console.log(`server runnign on ${port} on ${process.pid}`);
	});
}
