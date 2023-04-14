// Get Elements From Front-End
const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.querySelector("#fortune-button");
const foodList = document.querySelector("#food-list");
const foodUrl = document.querySelector("#food-url");
const foodName = document.querySelector("#food-name");
const foodButton = document.querySelector("#food-button");
const rating = document.querySelector("#rating");
const ratingContainer = document.querySelector("#rating-container");
const plusButton = document.querySelector("#plus");
const minusButton = document.querySelector("#minus");

// Get Functions

const getCompliment = () => {
	axios
		.get("http://localhost:4000/api/compliment/")
		.then((res) => {
			const data = res.data;
			alert(data);
		})
		.catch((err) => console.log(err));
};

const getFortune = () => {
	axios
		.get("http://localhost:4000/api/fortune")
		.then((res) => {
			const data = res.data;
			alert(data);
		})
		.catch((error) => console.log(error));
};

const getFoods = () => {
	foodList.innerHTML = "";
	axios
		.get("http://localhost:4000/api/foods")
		.then((res) => {
			let foodsArr = res.data;
			foodsArr.forEach((food, index) => {
				let foodTitle = document.createElement("h2");
				let newFood = document.createElement("img");
				let deleteButton = document.createElement("button");

				let { image, name } = food;
				newFood.src = image;
				foodTitle.textContent = name;

				deleteButton.textContent = "X";
				deleteButton.id = index;
				deleteButton.addEventListener("click", deleteFood);

				foodList.appendChild(foodTitle);
				foodList.appendChild(newFood);
				foodList.appendChild(deleteButton);
			});
		})
		.catch((error) => console.log(error));
};
const getRating = () => {
	axios
		.get("http://localhost:4000/api/rating")
		.then((res) => {
			let newRating = res.data.rating;
			rating.textContent = newRating;
		})
		.catch((error) => console.log(error));
};

getRating();
getFoods();
complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);

// Post Functions

const addFood = (e) => {
	e.preventDefault();

	let body = {
		name: `${foodName.value}`,
		image: `${foodUrl.value}`,
	};

	axios
		.post("http://localhost:4000/api/foods", body)
		.then((res) => {
			getFoods(res.data);
		})
		.catch((error) => console.log(error));

	foodUrl.value = "";
	foodName.value = "";
};

foodButton.addEventListener("click", addFood);

// Delete Functions

const deleteFood = (evt) => {
	axios
		.delete(`http://localhost:4000/api/foods/${evt.target.id}`)
		.then((res) => {
			getFoods(res.data);
		})
		.catch((error) => console.log(error));
};

// Put Functions

const changeRating = (evt) => {
	let type = evt.target.id;

	axios
		.put("http://localhost:4000/api/rating/change", { type })
		.then((res) => {
			let newRating = res.data.rating;
			rating.textContent = newRating;
		})
		.catch((error) => console.log(error));
};

plusButton.addEventListener("click", changeRating);
minusButton.addEventListener("click", changeRating);
