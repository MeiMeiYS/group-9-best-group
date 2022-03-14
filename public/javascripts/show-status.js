window.addEventListener("load", (event) => {

    const showCookedBtn = document.querySelector('#show-cooked-btn');
    const showWillCookBtn = document.querySelector('#show-will-cook-btn');

    const cookedContainer = document.querySelector('.cooked-container');
    const willCookContainer = document.querySelector('.will-cook-container');

    showCookedBtn.addEventListener('click', async (event) => {
        const cookedRecipes = document.createElement('div');
        cookedRecipes.classList.add('recipe-card-div');
        cookedRecipes.classList.add('recipe-card-div-cooked')

        if (showCookedBtn.innerHTML === 'View Recipes') {
            showCookedBtn.innerHTML = 'Hide Recipes'
            fetch(`/api/recipes/cooked`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            let recipe = res[i];
                            cookedRecipes.innerHTML += `
                            <div class="card" id="card-${recipe.recipeId}">
                                <img src="${recipe.recipeImg}" alt="recipe-image">
                                    <div class="title">
                                        <h3>${recipe.recipeName}</h3>
                                    </div>
                                    <div class="view-button">
                                        <a class="button" href="/recipes/${recipe.recipeId}">View Recipe</a>
                                    </div>
                                `
                        }
                    } else {
                        //no recipes have that status
                        cookedRecipes.innerHTML = `<p>No recipes have been added yet!</p>`
                    }
                })

            cookedContainer.appendChild(cookedRecipes);

        } else {
            showCookedBtn.innerHTML = 'View Recipes';
            const currentCookedDiv = document.querySelector('.recipe-card-div-cooked');
            currentCookedDiv.remove();
        }


    })


    showWillCookBtn.addEventListener('click', (event) => {
        const willCookRecipes = document.createElement('div');
        willCookRecipes.classList.add('recipe-card-div');
        willCookRecipes.classList.add('recipe-card-div-will-cook')

        if (showWillCookBtn.innerHTML === 'View Recipes') {
            showWillCookBtn.innerHTML = 'Hide Recipes'
            fetch(`/api/recipes/will-cook`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.length > 0) {
                        for (let i = 0; i < res.length; i++) {
                            let recipe = res[i];
                            willCookRecipes.innerHTML += `
                            <div class="card" id="card-${recipe.recipeId}">
                                <img src="${recipe.recipeImg}" alt="recipe-image">
                                    <div class="title">
                                        <h3>${recipe.recipeName}</h3>
                                    </div>
                                    <div class="view-button">
                                        <a class="button" href="/recipes/${recipe.recipeId}">View Recipe</a>
                                    </div>
                                `
                        }
                    } else {
                        //no recipes have that status
                        willCookRecipes.innerHTML = `<p>No recipes have been added yet!</p>`
                    }
                })

            willCookContainer.appendChild(willCookRecipes);

        } else {
            showWillCookBtn.innerHTML = 'View Recipes';
            const currentWillCookDiv = document.querySelector('.recipe-card-div-will-cook');
            currentWillCookDiv.remove();
        }
    })

})
