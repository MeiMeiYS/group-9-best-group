import { ratingFeature } from './element-generator.js'

document.addEventListener("DOMContentLoaded", event => {
    const recipe = document.querySelector("h1.recipe-name")
    const recipeName = recipe.innerText;
    const ratings = ratingFeature(recipeName);

    
});
