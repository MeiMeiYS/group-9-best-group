export function ratingFeature(recipeName) {
    const ratingDiv = document.createElement("div");
    ratingDiv.setAttribute("class", "rating");
    for (let i = 5; i >= 1; i--) {
        const input = document.createElement("input");
        input.setAttribute("name", `${recipeName}-rating`);
        input.setAttribute("id", `recipeNameRating-${i}`);
        input.setAttribute("type", "radio");
        const label = document.createElement("label");
        label.setAttribute("for", `recipeNameRating-${i}`);
        ratingDiv.append(input, label);
    }
    return ratingDiv;
}


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
