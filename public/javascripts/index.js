window.addEventListener("load", (event)=>{
})


const searchForRecipes = async () => {
    let searchTerm = document.querySelector('#recipe-search').value;
    let resultArea = document.querySelector('#search-results')
    resultArea.innerHTML=''
    document.querySelector('#recipe-search').value = '';

    let result = fetch('api/recipes/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm })
    })
        .then(res => res.json())
        .then(data => {
            let foundRecipes = data.foundRecipes
            if (searchTerm == '') {
                resultArea.innerHTML = `<h3 class="results-header">Please enter a search term.</h3>`
            } else if (foundRecipes.length < 1) {
                resultArea.innerHTML = `<h3 class="results-header"> Sorry, no results found for ${searchTerm}.</h3>`
            } else {
                for (let i = 0; i < foundRecipes.length; i++) {
                    let foundRecipe = foundRecipes[i];
                    resultArea.innerHTML += `
                    <div class="card">
                    <img src="${foundRecipe.Image.url}" alt="recipe-image">
                    <div class="title">
                      <h2>${foundRecipe.name}</h2>
                    </div>
                    <div class="username"> ${foundRecipe.User.userName}</div>
                    <div class="view-button">
                        <a class="button" href="/recipes/${foundRecipe.id}">View Recipe</a>
                    </div>
                    `
                }
            }
            return 1;
        })
        .catch(e => {
            console.error(e)
            return

        })
    return result
}
