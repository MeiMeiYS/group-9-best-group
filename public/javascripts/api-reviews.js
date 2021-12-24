import { ratingFeature, getPErrors } from './element-generator.js';
// error checker
function isUrl(string) {
    const badURL = document.getElementById("urlBad");
    try {
        (Boolean(new URL(string)))
        if (!badURL.hasAttribute("hidden")) {
            badURL.setAttribute("hidden", "");
            return true
        }
        return true
    }
    catch (e) {
        badURL.removeAttribute("hidden");
        return false;
    }
}

function hasRating(rating) {
    const noRating = document.getElementById("ratingBad");
    if (rating) {
        if (!noRating.hasAttribute("hidden")) {
            noRating.setAttribute("hidden", "");
            return true;
        }
        return true;
    }
    else {
        noRating.removeAttribute("hidden");
        return false;
    }
}

function hasReview() {
    const noReview = document.getElementById("reviewBad");
    const reviewText = document.getElementById("review")
    if (reviewText.value) {
        if (!noReview.hasAttribute("hidden")) {
            noRating.setAttribute("hidden", "");
            return true;
        }
        return true;
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
    console.log("reviews", reviews);
    return reviews;
};

// mapping all reviews
const reviewsHTML = async (reviewsArray) => {
    console.log("reviewsHTML)")
    const allReviewsDiv = document.getElementById("allReviews");
    console.log("allReviewsDiv", allReviewsDiv);
    const allReviewsHTML = reviewsArray.map(({ User, review, Image, userId, recipeId, id, rating, updatedAt }) => `
        <div class="review-box">
            <div class="review-image-container">
                <img src="${Image.url}" class="review-image">
                    </div>
                    <div class="review-data">
                        <p class="review-rating">${rating}<span> out of 5</span></p>
                        <p class="review-text" id="review-${id}">${review}</p>
                        <div class="date-metadata">
                            <p class="author" id="${userId}">${User.userName}</p>
                            <p class="review-date">${new Date(updatedAt).toDateString().slice(3)}</p>
                        </div>
                    </div>
                </div>`
    );
    allReviewsHTML.unshift(`<p class="review-header">Reviews</p>`);
    allReviewsDiv.innerHTML = allReviewsHTML.join("");
    console.log("allReviewsDiv", allReviewsDiv)
    return;
};

// when cancel button is pressed, form goes away, submitButton comes back

// when submit button is clicked, need to invoke newReview();
// event listener for submit button
// --> submit button only appears when Submit a New Recipe is clicked
// --> when reviewForm is made, make a new

window.onload = event => {
    // const recipe = document.getElementById("recipeinfo");
    const recipe = document.querySelector("h1.recipe-name")
    const recipeName = recipe.innerText;

    // adding rating feature (whisks)
    const ratings = ratingFeature(recipeName);
    const user = document.getElementById("userinfo");
    if (user) {
        user.id = parseInt(user.dataset.userid, 10);
        console.log("userId", user.id);
    }
    recipe.id = parseInt(recipe.dataset.recipeid, 10);
    console.log("recipeId", recipe.id);

    // `Add a Review` button
    const addAReview = document.getElementById('addAReview');
    const reviewFormDiv = document.getElementById('reviewFormDiv');
    getPErrors();
    addAReview.addEventListener("click", event => {
        event.stopPropagation();
        addAReview.setAttribute("hidden", "");
        reviewFormDiv.removeAttribute("hidden");
    });

    //`Submit` button
    const submitButton = document.getElementById("review-submit");
    submitButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        event.preventDefault();
        //grabbing data from review form
        const ratingValue = document.querySelector(".rating-form:checked").value;
        const imageURL = document.getElementById("imageURL");
        const reviewText = document.getElementById("review")
        console.log("hasRating", hasRating(ratingValue));
        if ((imageURL.value === "" || isUrl(imageURL.value)) && hasRating(ratingValue) && hasReview(reviewText.value)) {
            console.log("passed conditional");
            const rating = parseInt(ratingValue, 10);
            console.log("rating", rating);
            const body = {
                userId: user.id,
                review: reviewText.value,
                imageURL: imageURL.value || null,
                recipeId: recipe.id,
                rating
            }
            console.log("about to make a new review");
            const reviewsArray = await newReview(body);
            console.log("reviewsArray", reviewsArray);
            console.log(reviewsArray[0]);
            await reviewsHTML(reviewsArray);
        }
    });

    // `Cancel` Button
    const cancelButton = document.getElementById("review-cancel");
    cancelButton.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        reviewFormDiv.replaceWith(addAReview);
    })
};

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
    console.log("res.status", res.status);
    if (res.status === 200) {
        return fetchReviews(recipeId);
    }
    else {
        throw Error;
    }
};
