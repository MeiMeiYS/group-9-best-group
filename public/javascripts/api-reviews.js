import { ratingFeature, getPErrors, editButtonsEventListeners } from './element-generator.js';

// getting all reviews -- need recipe Id, need userName
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
};

// mapping all reviews
const reviewsHTML = async (reviewsArray) => {
    const user = document.getElementById("userinfo");
    let currUserId
    if (user) {
        currUserId = parseInt(user.dataset.userid, 10);
    }
    const allReviewsDiv = document.getElementById("allReviews");
    const allReviewsHTML = reviewsArray.map(({ User, review, Image, userId, recipeId, id, rating, updatedAt }) => {
        if (userId === currUserId) {
            const reviewHTML = `
        <div class="review-box" id="review-${id}">
            <div class="review-image-container">
                <img src="${Image.url}" class="review-image" id="${Image.id}">
                    </div>
                    <div class="review-data">
                        <p class="review-rating">${rating}<span> out of 5</span></p>
                        <p class="review-text" id="review-${id}">${review}</p>
                        <div class="editButtons">
                            <button class="edit" id="editreview-${id}">Edit Review</button>
                            <button class="delete" id="deletereview-${id}">Delete Review</button>
                        </div>
                        <div class="date-metadata">
                            <p class="author" id="${userId}">${User.userName}</p>
                            <p class="review-date">${new Date(updatedAt).toDateString().slice(3)}</p>
                        </div>
                    </div>
                </div>`
            return reviewHTML;
        }
        else {
            const reviewHTML = `
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
            return reviewHTML;
        }
    });
    allReviewsHTML.unshift(`<p class="review-header">Reviews</p>`);
    allReviewsDiv.innerHTML = allReviewsHTML.join("");
    deleteButtonsEventListeners();
    editButtonsEventListeners();
    return;
};

// when cancel button is pressed, form goes away, submitButton comes back

// when submit button is clicked, need to invoke newReview();
// event listener for submit button
// --> submit button only appears when Submit a New Recipe is clicked
// --> when reviewForm is made, make a new

document.addEventListener("DOMContentLoaded", event => {
    // const recipe = document.getElementById("recipeinfo");
    const recipe = document.querySelector("h1.recipe-name")
    const recipeName = recipe.innerText;

    // adding event listeners to edit buttons
    editButtonsEventListeners();

    // adding event listeners to delete buttons
    deleteButtonsEventListeners();

    // adding rating feature (whisks)
    const ratings = ratingFeature(recipeName);
    const user = document.getElementById("userinfo");
    let userId
    if (user) {
        userId = parseInt(user.dataset.userid, 10);
    }
    recipe.id = parseInt(recipe.dataset.recipeid, 10);

    // `Add a New Review` button
    const addAReview = document.getElementById('addAReview');
    const reviewFormDiv = document.getElementById('reviewFormDiv');
    getPErrors();
    addAReview.addEventListener("click", event => {
        event.stopPropagation();
        addAReview.setAttribute("hidden", "");
        reviewFormDiv.removeAttribute("hidden");
    });

    //`Submit review` button
    const submitButton = document.getElementById("review-submit");
    submitButton.addEventListener("click", async (event) => {
        event.stopPropagation();
        event.preventDefault();
        //grabbing data from review form
        const imageURL = document.getElementById("imageURL");
        const reviewText = document.getElementById("review")
        if (hasRating() && hasReview(reviewText.value)) {
            const rating = parseInt(document.querySelector(".rating-form:checked").value, 10);
            const body = {
                userId,
                review: reviewText.value,
                imageURL: null,
                recipeId: recipe.id,
                rating
            }
            if (imageURL.value) {
                if (isUrl(imageURL.value)) {
                    body.imageURL = imageURL.value;
                    const reviewsArray = await newReview(body);
                    await reviewsHTML(reviewsArray);
                    deleteButtonsEventListeners();
                    return;
                }
                else { return }
            }
            else {
                const badURL = document.getElementById("urlBad");
                if (!badURL.hasAttribute("hidden")) {
                    badURL.setAttribute("hidden", "");
                }
                const reviewsArray = await newReview(body);
                await reviewsHTML(reviewsArray);
                deleteButtonsEventListeners();
            }
        }
    });

    // `Cancel` Button
    const cancelButton = document.getElementById("review-cancel");
    cancelButton.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        reviewFormDiv.setAttribute("hidden", "");
        const reviewText = document.getElementById("review");
        const imageURL = document.getElementById("imageURL");
        reviewText.value = "";
        imageURL.value = "";
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
        const reviewFormDiv = document.getElementById("reviewFormDiv");
        reviewFormDiv.setAttribute("hidden", "");
        return fetchReviews(recipeId);
    }
    else {
        throw Error;
    }
};

async function deleteReview(bodyJS) {
    const { reviewId, recipeId } = bodyJS;
    const body = JSON.stringify(bodyJS);
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body
    });
    if (res.status === 200) {
        return fetchReviews(recipeId);
    }
    else {
        throw Error;
    }
}

function deleteButtonsEventListeners() {
    const allDeleteButtons = document.querySelectorAll("button.delete");
    const user = document.getElementById("userinfo");
    const userId = parseInt(user.dataset.userid, 10);
    const recipeId = parseInt(document.querySelector("h1.recipe-name").dataset.recipeid, 10);
    for (let i = 0; i < allDeleteButtons.length; i++) {
        allDeleteButtons[i].addEventListener("click", async (event) => {
            event.stopPropagation();
            event.preventDefault();
            const reviewId = parseInt(allDeleteButtons[i].id.split("-")[1], 10);
            const imageId = parseInt(document.querySelector(`div#review-${reviewId} > div.review-image-container > img.review-image`).id, 10);
            const body = {
                reviewId,
                userId,
                imageId,
                recipeId,
            }
            const reviewsArray = await deleteReview(body);
            await reviewsHTML(reviewsArray);
            return;
        });
    }
}
