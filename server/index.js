const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {
	getCompliment,
	getFortune,
	getFoods,
	addFood,
	deleteFood,
	getRating,
	changeRating,
} = require("./controller");

// Get Requests

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/foods", getFoods);
app.get("/api/rating", getRating);

// Post Requests

app.post("/api/foods", addFood);

// Delete Requests

app.delete("/api/foods/:index", deleteFood);

// Put Requests

app.put("/api/rating/change", changeRating);

app.listen(4000, () => console.log("Server running on 4000"));
