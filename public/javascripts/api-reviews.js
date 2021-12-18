import { ratingFeature } from './element-generator.js';
import { getPErrors } from './element-generator.js';

// building `Add A Review` form
const reviewFormDiv = document.createElement("div");
const reviewForm = document.createElement("form");
const reviewText = document.createElement("textarea");
const imageURL = document.createElement("input");
imageURL.setAttribute("type", "text");
imageURL.setAttribute("id", "imageURL");
const imageURLLabel = document.createElement("label");
imageURLLabel.htmlFor = "imageURL";
imageURLLabel.innerText = `URL for an Image (Optional)`;
reviewForm.appendChild(reviewText);
reviewText.style.width = `100%`;
reviewText.style.height = `80%`;
reviewText.setAttribute("name", "review");
reviewText.setAttribute("required", "");
const reviewButtonsDiv = document.createElement("div");
const submitButton = document.createElement("button");
submitButton.innerText = "SUBMIT"
const cancelButton = document.createElement("button");
cancelButton.innerText = "CANCEL"
reviewButtonsDiv.append(submitButton, cancelButton)
reviewFormDiv.append(reviewForm, imageURLLabel, imageURL, reviewButtonsDiv)
reviewFormDiv.appendChild(reviewButtonsDiv);
submitButton.innerText = "SUBMIT"
cancelButton.innerText = "CANCEL"

// get numeric rating
function getNumericRating(id) {
    const idArray = id.split("-");
    const numId = parseInt(idArray[1], 10);
    return numId;
}

// error checker
function isUrl(string) {
    console.log("badURL");
    const badURL = document.getElementById("urlBad");
    try {
        (Boolean(new URL(string)))
        if (!badURL.hasAttribute("hidden")) {
            badURL.setAttribute("hidden", "");
            return true
        }
    }
    catch (e) {
        badURL.removeAttribute("hidden");
        return false;
    }
}

function hasRating() {
    const noRating = document.getElementById("ratingBad");
    if (document.querySelector("input:checked")) {
        if (!noRating.hasAttribute("hidden")) {
            noRating.setAttribute("hidden", "");
            return true
        }
    }
    else {
        noRating.removeAttribute("hidden");
        return false;
    }
}

function hasReview() {
    const noReview = document.getElementById("reviewBad");
    if (reviewText.value) {
        if (!noReview.hasAttribute("hidden")) {
            noRating.setAttribute("hidden", "");
            return true;
        }
    }
    else {
        noReview.removeAttribute("hidden");
        return false;
    }
}


// getting all reviews -- need recipe Id, need userName // THIS WORKS
const fetchReviews = async (recipeId) => {
    const res = await fetch(`/api/reviews/recipe/${recipeId}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    });
    const data = await res.json()
    const reviews = data.reviews // data.reviews = array of reviews
    return reviews;
}

// when cancel button is pressed, form goes away, submitButton comes back

// when submit button is clicked, need to invoke newReview();
// event listener for submit button
// --> submit button only appears when Submit a New Recipe is clicked
// --> when reviewForm is made, make a new

document.addEventListener("DOMContentLoaded", (event) => {
    // const recipe = document.getElementById("recipeinfo");
    const recipe = document.querySelector("h1.recipe-name")
    const recipeName = recipe.innerText;
    const ratings = ratingFeature(recipeName);
    reviewFormDiv.append(ratings);
    const user = document.getElementById("userinfo");
    if (user) {
        user.id = parseInt(user.dataset.userid, 10);
        console.log(user.id);
    }
    recipe.id = parseInt(recipe.dataset.recipeid, 10);

    // `Add a Review` button
    const addAReview = document.getElementById('addAReview');
    getPErrors();
    addAReview.addEventListener("click", event => {
        event.stopPropagation();
        addAReview.replaceWith(reviewFormDiv);
    });

    //`Submit` button
    submitButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        event.preventDefault();
        //grabbing rating
        const ratingInput = document.querySelector("input:checked");
        if ((isUrl(imageURL.value) || imageURL.value === undefined) && hasRating() && hasReview()) {
            const rating = getNumericRating(ratingInput.id);
            const body = {
                userId: user.id,
                review: reviewText.value,
                imageURL: imageURL.value || null,
                recipeId: recipe.id,
                rating
            }
            const reviewsArray = newReview(body);
            const reviewsHTML = reviewsArray.map( (review) => {
                
            })

            const allReviews = document.getElementById("allReviews");


        }
    });

    // `Cancel` Button
    cancelButton.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        reviewFormDiv.replaceWith(addAReview);
    })
});

// posting a new review function
async function newReview(bodyJS) {
    const { recipeId } = bodyJS;
    const body = JSON.stringify(bodyJS);
    const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    });
    if (res.status === 200) {
        return fetchReviews(recipeId);
    }
    else {
        throw error
    }
};
