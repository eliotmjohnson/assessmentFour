const db = require("../database/db.json");
let rating = 0;

module.exports = {
	getCompliment: (req, res) => {
		const compliments = [
			"Gee, you're a smart cookie!",
			"Cool shirt!",
			"Your Javascript skills are stellar.",
		];

		// choose random compliment
		let randomIndex = Math.floor(Math.random() * compliments.length);
		let randomCompliment = compliments[randomIndex];

		res.status(200).send(randomCompliment);
	},
	getFortune: (req, res) => {
		const fortunes = [
			"A person of words and not deeds is like a garden full of weeds.",
			"A truly rich life contains love and art in abundance.",
			"All the effort you are making will ultimately pay off.",
			"Dedicate yourself with a calm mind to the task at hand.",
			"Each day, compel yourself to do something you would rather not do.",
		];
		let randomIndex = Math.floor(Math.random() * fortunes.length);
		let randomFortune = fortunes[randomIndex];

		res.status(200).send(randomFortune);
	},
	getRating: (req, res) => {
		res.status(200).send({ rating });
	},
	getFoods: (req, res) => {
		res.status(200).send(db);
	},
	addFood: (req, res) => {
		let { image, name } = req.body;
		let food = {
			name: name,
			image: image,
		};
		db.push(food);
		res.status(200).send(db);
	},
	deleteFood: (req, res) => {
		let { index } = req.params;
		db.splice(+index, 1);
		res.status(200).send(db);
	},
	changeRating: (req, res) => {
		let { type } = req.body;
		if (type === "plus" && rating < 5) {
			rating++;
		} else if (type === "minus" && rating > 0) {
			rating--;
		}
		res.status(200).send({ rating });
	},
};
