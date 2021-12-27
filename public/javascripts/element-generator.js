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
    errorsDiv.innerHTML = `<p hidden id="ratingBad" class="errors">Please rate this recipe.</p><p hidden id="urlBad" class="errors">If you want to upload an image, please provide a valid URL. Otherwise, leave the field blank.</p><p hidden id="reviewBad" class="errors">Please review this recipe.</p>`;
    return errorsDiv;
}

export function editButtonsEventListeners() {
    const allEditButtons = document.querySelectorAll(".edit");
    for (let i = 0; i < allEditButtons.length; i++) {
        allEditButtons[i].addEventListener("click", (event) => {
            event.stopPropagation();
            const reviewId = allEditButtons[i].id.split("-")[1];
            // when clicking --> redirect to the review page
            window.location.href = `/api/reviews/${reviewId}/edit`;
        })
    }
}
