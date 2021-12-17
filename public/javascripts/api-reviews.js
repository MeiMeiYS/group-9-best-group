// const router = require('../../routes/api/reviews');
// fetching user


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
    const recipe = document.getElementById("recipeinfo");
    const user = document.getElementById("userinfo")
    console.log(recipe, user.dataset.userid, "????");
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
        const body = {
            userId: user.id, //this will be res.locals.user
            review: reviewText.value,
            imageURL: imageURL.value,
            recipeId: recipe.id
        }
        await newReview(body)
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
    fetch("/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
    return;
};

// auth check
const fetchUser = async () => {
    const res = await fetch("")
}
