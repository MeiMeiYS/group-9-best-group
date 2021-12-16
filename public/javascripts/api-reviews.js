const reviewForm = document.createElement("form");
const reviewText = document.createElement("textarea");
reviewText.style.width = `100%`;
reviewText.style.height = `80%`;
const reviewButtons = document.createElement("a");



document.addEventListener("DOMContentLoaded", event => {
    // const currUser = {};
    // if (res.locals.user) {
    //     currUser.id = res.locals.user.id;
    // }


    // add a review button
    const addAReview = document.getElementById('addAReview');
    addAReview.addEventListener("click", event => {
        event.stopPropagation();
        addAReview.innerHTML = "<h1>Henlo?</h1>"
    });

});
