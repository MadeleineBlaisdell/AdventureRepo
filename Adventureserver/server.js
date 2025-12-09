const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve files from `public` first, then from the project root so
// `index.html` files in subfolders are reachable (useful for local dev).
app.use(express.json());

app.use('/', express.static('public'));

// let tempScores = [//filler to be replaced
// 	{ name: "jane", "score": 40 },
// 	{ name: "Don", "score": 20 },
// 	{ name: "Larry", "score": 30 }
// ];

let leaderboard = [];

// app.post('')
app.get("/leaderboard", (req, res) => {
	const sortedScores = leaderboard.sort((a,b)=> a.score - b.score);
	res.json({ scores: sortedScores });
});

app.post("/leaderboard", (req, res)=>{
	console.log(req.body);
	let currentDate = new Date().toLocaleString();
	let obj = {
		date: currentDate,
		name: req.body.name,
		score: req.body.score
}
leaderboard.push(obj);
leaderboard.sort((a,b)=> a.score -b.score);
leaderboard = leaderboard.slice(0,10);

console.log(leaderboard);
res.json({ task: "success" });
});

// app.get("/data",(req,res)=> {
//     let obj = {data: tempScores};
//     res.json(obj);
// });

app.listen(PORT, () => {//replace PORT with 3000 if needed.
	console.log(`Server running at http://localhost:${PORT}`);
});

// fetch("/data")
// 	.then((response => response.json()))
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});