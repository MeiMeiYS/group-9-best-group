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
            .then(res => {
                console.log(res)
            })

            //console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', data);

            //data is an array of objects
            // if (data.length > 0) {
            //     // for (let i = 0; i < data.length; i++) {
            //     //     let recipe
            //     // }
            // } else {
            //     //no recipes have that status
            //     cookedRecipes.innerHTML = `<p>No recipes have been added yet!</p>`
            // }
            // cookedContainer.appendChild(cookedRecipes);

        } else {
            showCookedBtn.innerHTML = 'View Recipes';
            const currentCookedDiv = document.querySelector('.recipe-card-div-cooked');
            currentCookedDiv.remove();
        }


    })


    showWillCookBtn.addEventListener('click', (event) => {
        console.log('BYEEEEEEEEEEEEEEE')
    })

})
