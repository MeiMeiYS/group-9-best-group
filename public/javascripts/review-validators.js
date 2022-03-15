// error checker
export function isUrl(string) {
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

export function hasRating() {
    const noRating = document.getElementById("ratingBad");
    const rating = document.querySelector(".rating-form:checked");
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

export function hasReview() {
    const noReview = document.getElementById("reviewBad");
    const reviewText = document.getElementById("review")
    if (reviewText.value) {
        if (!noReview.hasAttribute("hidden")) {
            noReview.setAttribute("hidden", "");
            return true;
        }
        return true;
    }
    else {
        noReview.removeAttribute("hidden");
        return false;
    }
}
