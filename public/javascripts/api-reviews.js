import { ratingFeature, getPErrors} from './element-generator.js';
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
    return reviews;
}

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
    submitButton.addEventListener("click", (event) => {
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
            const reviewsArray = newReview(body);
            console.log("reviewsArray", reviewsArray);
            // const reviewsHTML = reviewsArray.map( (review) => {
            //     const {userId, review, userName, } = review
            //     return;
            // })
            // const allReviews = document.getElementById("allReviews");
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
