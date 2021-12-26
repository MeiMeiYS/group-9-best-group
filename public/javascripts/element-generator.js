export function ratingFeature(recipeName) {
    const ratingWhisks = document.getElementById("ratingWhisks");
    ratingWhisks.setAttribute("class", "rating");
    for (let i = 5; i >= 1; i--) {
        const input = document.createElement("input");
        input.setAttribute("name", `${recipeName}-rating`);
        input.setAttribute("class", "rating-form")
        input.setAttribute("id", `${recipeName}Rating-${i}`);
        input.setAttribute("type", "radio");
        input.setAttribute("value", `${i}`);
        const label = document.createElement("label");
        label.setAttribute("for", `${recipeName}Rating-${i}`);
        ratingWhisks.append(input, label);
    }
    return
}

export function getPErrors() {
    const errorsDiv = document.getElementById("errorsDiv")
    errorsDiv.innerHTML = `<p hidden id="ratingBad" class="errors">Please rate this recipe.</p><p hidden id="urlBad" class="errors">Please provide a valid URL.</p><p hidden id="reviewBad" class="errors">Please review this recipe.</p>`;
    return errorsDiv;
}

export function editButtonsEventListeners() {
    const allEditButtons = document.querySelectorAll(".edit");
    for (let i = 0; i < reviewDivs.length; i++) {
        allEditButtons[i].addEventListener("click", (event) => {
            event.stopPropagation();
            const reviewId = allEditButtons[i].id.split("-")[1];
            // when clicking --> redirect to the review page
            window.location.href = `/${reviewId}/edit`;
        })
    }

}

export function deleteButtonsEventListeners() {

}

const reviewbox = document.getElementById("review-1");

// export function buildReviewForm () {
//     const reviewFormDiv = document.createElement("div");
//     reviewFormDiv.setAttribute("id", "reviewForm")
//     const reviewForm = document.createElement("form");
//     const reviewText = document.createElement("textarea");
//     const imageURL = document.createElement("input");
//     imageURL.setAttribute("type", "text");
//     imageURL.setAttribute("id", "imageURL");
//     const imageURLLabel = document.createElement("label");
//     imageURLLabel.htmlFor = "imageURL";
//     imageURLLabel.innerText = `URL for an Image (Optional)`;
//     reviewForm.appendChild(reviewText);
//     reviewText.style.width = `100%`;
//     reviewText.style.height = `80%`;
//     reviewText.setAttribute("name", "review");
//     reviewText.setAttribute("required", "");
//     const reviewButtonsDiv = document.createElement("div");
//     const submitButton = document.createElement("button");
//     submitButton.setAttribute("id", "review-submit");
//     submitButton.innerText = "SUBMIT"
//     const cancelButton = document.createElement("button");
//     cancelButton.setAttribute("id", "review-cancel")
//     cancelButton.innerText = "CANCEL"
//     reviewButtonsDiv.append(submitButton, cancelButton)
//     reviewFormDiv.append(reviewForm, imageURLLabel, imageURL, reviewButtonsDiv)
//     reviewFormDiv.appendChild(reviewButtonsDiv);
//     submitButton.innerText = "SUBMIT"
//     cancelButton.innerText = "CANCEL"
//     return reviewFormDiv;
// }
// export async function newReviewDiv(newReview) { // put this into pug?
//     const { review, rating, userId, imageId, id, recipeId } = newReview;
//     const reviewDiv = document.createElement("div");
//     reviewDiv.setAttribute("data-reviewId", `${id}`);
//     const userDiv = document.createElement("div");
//     userDiv.setAttribute("data-userId", `${userId}`);
//     const user = await User.findByPk(userId);
//     const recipe = await Recipe.findByPk(recipeId);
//     userDiv.innerText = user.userName;
//     const ratingDiv = ratingFeature(recipe.name);
//     // select the appropriate whisk
//     const ratingWhisk = document.getElementById(`${recipe.name}-${rating}`);
//     // set the attribute to checked
//     ratingWhisk.checked = true;
//     const reviewText = document.createElement("div");
//     reviewText.innerHTML = `<p>${review}</p>`;
//     reviewDiv.append(userDiv, ratingDiv, reviewText);
// }

// module.exports = {

// }
