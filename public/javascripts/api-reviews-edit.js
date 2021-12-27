import { ratingFeature } from './element-generator.js'

document.addEventListener("DOMContentLoaded", event => {
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
        const ratingValue = parseInt(document.querySelector(".rating-form:checked").value, 10);
        const userId = parseInt(document.getElementById("userinfo").dataset.userid, 10);
        const imageURL = document.getElementById("imageURL").value;
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
            rating: ratingValue,
            _csrf: csrfToken
        }
        await editReview(body);
    });

    const cancelButton = document.getElementById("review-cancel")
    cancelButton.addEventListener("click", event => {
        window.location.href = `/recipes/${recipeId}`;
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
    const data = await res.json();
    if (data === "SUCCESS") {
        window.location.href = `/recipes/${recipeId}`
    }
};
