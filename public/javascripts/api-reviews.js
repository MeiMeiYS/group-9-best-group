import { ratingFeature } from './element-generator.js';
// const router = require('../../routes/api/reviews');
// fetching user
// get numeric rating
function getNumericRating(id) {
    const idArray = id.split("-");
    const numId = parseInt(idArray[1], 10);
    return numId;
}

// getting all reviews -- need recipe Id, need userName
const fetchReviews = async (recipeId) => {
    // find all reviews, sort by desc
    const reviews = await Review.findAll({
        where: {
            recipeId: recipeId
        },
        include: {model: User},
        order: [
            [`updatedAt`, 'DESC']
        ]
    });
}
// building `Add A Review` form
const reviewFormDiv = document.createElement("div");
const reviewForm = document.createElement("form");
const reviewText = document.createElement("textarea");
const imageURL = document.createElement("input");
imageURL.setAttribute("type", "url");
imageURL.setAttribute("name", "imageURL");
const imageURLLabel = document.createElement("label");
imageURLLabel.htmlFor = "imageURL";
imageURLLabel.innerText = `URL for an Image (Optional)`;
reviewForm.appendChild(reviewText);
reviewText.style.width = `100%`;
reviewText.style.height = `80%`;
reviewText.setAttribute("name", "review");
const reviewButtonsDiv = document.createElement("div");
const submitButton = document.createElement("a");
const cancelButton = document.createElement("a");
(() => {
    const buttons = [submitButton, cancelButton];
    const formDivEles = [reviewForm, imageURLLabel, imageURL, reviewButtonsDiv]
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("href", "#")
        reviewButtonsDiv.appendChild(buttons[i]);
    }
    for (let i = 0; i < formDivEles.length; i++) {
        formDivEles[i].setAttribute("href", "#")
        reviewFormDiv.appendChild(formDivEles[i]);
    }
})();
reviewFormDiv.appendChild(reviewButtonsDiv);
submitButton.innerText = "SUBMIT"
cancelButton.innerText = "CANCEL"
// when cancel button is pressed, form goes away, submitButton comes back

// when submit button is clicked, need to invoke newReview();
// event listener for submit button
// --> submit button only appears when Submit a New Recipe is clicked
// --> when reviewForm is made, make a new


window.addEventListener("DOMContentLoaded", (event) => {
    // const recipe = document.getElementById("recipeinfo");
    const recipe = document.querySelector("p[name]")
    const recipeName = recipe.attributes.name.value
    const ratings = ratingFeature(recipeName);
    reviewFormDiv.append(ratings);
    const user = document.getElementById("userinfo");
    if (user) {
        user.id = parseInt(user.dataset.userid, 10);
        console.log(user.id);
    }
    recipe.id = parseInt(recipe.dataset.recipeid, 10)
    // `Add a Review` button
    const addAReview = document.getElementById('addAReview');
    addAReview.addEventListener("click", event => {
        event.stopPropagation();
        addAReview.replaceWith(reviewFormDiv);
    });
    //`Submit` button
    submitButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        console.log("reviewText", reviewText.value);
        //grabbing rating
        const ratingInput = document.querySelector("input:checked");
        const rating = getNumericRating(ratingInput.id);

        const body = {
            userId: user.id, //this will be res.locals.user
            review: reviewText.value,
            imageURL: imageURL.value,
            recipeId: recipe.id,
            rating
        }
        const res = await newReview(body);
        if (!res.ok) {
            throw res
        };
        if (res.status === 200) {
            reviewFormDiv.replaceWith(addAReview);
        }

    });

    // `Cancel` Button
    cancelButton.addEventListener("click", (event) => {
        event.stopPropagation();
        reviewFormDiv.replaceWith(addAReview);
    })
});

// posting a new review function
async function newReview(bodyJS) {
    const body = JSON.stringify(bodyJS);
    console.log("body", body);
    const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
    if (res.status !== 200) {
        throw error
    }
    const { newReview } = await res.json();
    // function to build newReview container
};
