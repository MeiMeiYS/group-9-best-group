import { ratingFeature } from './element-generator.js';
// get numeric rating
function getNumericRating(id) {
    const idArray = id.split("-");
    const numId = parseInt(idArray[1], 10);
    return numId;
}

// getting all reviews -- need recipe Id, need userName // THIS WORKS
const fetchReviews = async (recipeId) => {
    const res = fetch(`/api/reviews/recipe/${recipeId}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
        .then(res => {
            console.log(res, "line 18");
            return res.json()
        })
        .then(data => data.reviews) // data.reviews = array of reviews
    console.log("REVIEWS LINE 22", res);
    return res;
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
    const recipe = document.querySelector("h1.recipe-name")
    const recipeName = recipe.innerText;
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
        //grabbing rating
        const ratingInput = document.querySelector("input:checked");
        if (!ratingInput) {
            
        }
        const rating = getNumericRating(ratingInput.id);

        const body = {
            userId: user.id,
            review: reviewText.value,
            imageURL: imageURL.value,
            recipeId: recipe.id,
            rating
        }
        const review = await newReview(body);
        console.log(review, "review");

        if (review.status === 200) {
            reviewFormDiv.replaceWith(addAReview);
        }
        console.log("FETCH REVIEWS", fetchReviews(recipe.id));

    });

    // `Cancel` Button
    cancelButton.addEventListener("click", (event) => {
        event.stopPropagation();
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
        fetchReviews(recipeId);
    }
    else {
        throw error
    }
};
