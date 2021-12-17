// const router = require('../../routes/api/reviews');

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


document.addEventListener("DOMContentLoaded", (event) => {
    // const currUser = {};
    // if (res.locals.user) {
    //     currUser.id = res.locals.user.id;
    // }
    // `Add a Review` button
    console.log("recipeId", document);
    // const addAReview = document.getElementById('addAReview');
    // addAReview.addEventListener("click", event => {
    //     event.stopPropagation();
    //     addAReview.replaceWith(reviewFormDiv);
    // });
    // //`Submit` button
    // submitButton.addEventListener("click", async (event) => {
    //     event.stopPropagation();
    //     const body = {
    //         userId: 1, //this will be res.locals.user
    //         review: reviewText.value,
    //         imageURL: imageURL.value
    //     }
    //     newReview(body)
    // });

    // `Cancel` Button
    cancelButton.addEventListener("click", (event) => {
        event.stopPropagation();
        reviewFormDiv.replaceWith(addAReview);
    })
});

// posting a new review function
async function newReview(bodyJS) {
    const body = JSON.stringify(bodyJS);
    await fetch("/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
};

// auth check
const fetchUser = async () => {
    const res = await fetch("")
}
