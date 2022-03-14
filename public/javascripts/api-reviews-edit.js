import { ratingFeature, getPErrors } from './element-generator.js'
import { hasRating, isUrl, hasReview } from './review-validators.js'


document.addEventListener("DOMContentLoaded", event => {
    getPErrors();
    const recipe = document.querySelector("h1.recipe-name");
    const reviewId = parseInt(document.getElementById("reviewId").dataset.reviewid, 10);
    const recipeName = recipe.innerText;
    const recipeId = parseInt(recipe.dataset.recipeid, 10);
    const ratings = ratingFeature(recipeName);
    const submitButton = document.getElementById("review-submit");
    submitButton.addEventListener("click", async event => {
        event.preventDefault();
        event.stopPropagation();
        const review = document.getElementById("review").value;
        const imageURL = document.getElementById("imageURL").value;
        const userId = parseInt(document.getElementById("userinfo").dataset.userid, 10);
        const csrfToken = document.querySelector("input[name='_csrf']").value;
        const imageId = parseInt(document.getElementById("imageId").dataset.imageid, 10);
        const body = {
            id: reviewId,
            review: {
                review,
                id: reviewId,
                Image: {
                    id: imageId,
                    url: imageURL
                },
                userId
            },
            recipeId,
            rating: undefined,
            _csrf: csrfToken
        }
        if (hasRating() && hasReview(review)) {
            body.rating = parseInt(document.querySelector(".rating-form:checked").value, 10);
            if (imageURL) {
                if (isUrl(imageURL)) {
                    body.review.Image.url = imageURL
                }
                else { return };
            }
            console.log("body.rating", typeof body.rating, body.rating);
            const res = await editReview(body);
            if (res.status === 200) {
                window.location.assign(`/recipes/${recipeId}`);
            }
            return;
        }
        else { return };
    });

    const cancelButton = document.getElementById("review-cancel")
    cancelButton.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(`/recipes/${recipeId}`);
        document.getElementById("reviewBad").setAttribute("hidden", "");
        document.getElementById("ratingBad").setAttribute("hidden", "");
        document.getElementById("urlBad").setAttribute("hidden", "");

    });

});

async function editReview(bodyJS) {
    const { id, recipeId } = bodyJS;
    const body = JSON.stringify(bodyJS);
    const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    });
    console.log("res)", res);
    return res;
};
