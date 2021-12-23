// window.addEventListener("load", (event) => {

//     const deleteBtn = document.querySelector('#delete');

//     deleteBtn.addEventListener('click', async(e) => {

//         const csurf = document.querySelector('#csurf');
//         const csrfToken = csurf.value;
//         const recipe = document.querySelector('h1.recipe-name');
//         recipe.id = parseInt(recipe.dataset.recipeid, 10);

//         await fetch(`/recipes/${recipe.id}/delete`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             }, body: {
//                 _csurf: csrfToken
//             }

//         })

//     })

// })
