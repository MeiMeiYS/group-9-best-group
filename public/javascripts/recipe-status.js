window.addEventListener("load", (event) => {

    const addStatusBtn = document.querySelector('.add-status')

    addStatusBtn.addEventListener('click', event => {
        const statusContainerCheck = document.querySelector('.status-container');
        if (!statusContainerCheck){
            const statusContainer = document.createElement('div');
            const willCookBtn = createBtn('will-cook');
            willCookBtn.innerHTML = 'Will Cook';
            const cookedBtn = createBtn('cooked');
            cookedBtn.innerHTML = 'Cooked';
            statusContainer.classList.add('status-container');
            statusContainer.appendChild(willCookBtn);
            statusContainer.appendChild(cookedBtn);

            const loginButtons = document.querySelector('.log-in-buttons');
            loginButtons.appendChild(statusContainer);
            addStatusBtn.innerHTML = 'Close <i class="fas fa-hand-point-down" style="color:#fff6f4;"></i>';
            addStatusBtn.classList.add('.darkenBtn')

            const recipe = document.querySelector('h1.recipe-name');
            recipe.id = parseInt(recipe.dataset.recipeid, 10)

            fetch(`/api/recipes/${recipe.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json()).then(res => {
                res.map(obj => {
                    if (obj.statusId == 1) { //cooked
                        cookedBtn.classList.add('statusOn')
                    }
                    if (obj.statusId == 2) { //will-cook
                        willCookBtn.classList.add('statusOn')
                    }
                })
            })

            willCookBtn.addEventListener('click', event => {

                if (willCookBtn.classList.contains('statusOn')){
                    fetch(`/api/recipes/${recipe.id}/will-cook`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(res => willCookBtn.classList.remove('statusOn'))
                } else if (cookedBtn.classList.contains('statusOn')) {

                    fetch(`/api/recipes/${recipe.id}/will-cook`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(res => {
                        willCookBtn.classList.add('statusOn')
                        cookedBtn.classList.remove('statusOn')
                    })

                } else {
                    fetch(`/api/recipes/${recipe.id}/will-cook`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(res => willCookBtn.classList.add('statusOn'))
                }
            })

            cookedBtn.addEventListener('click', event => {

                if (cookedBtn.classList.contains('statusOn')){

                    fetch(`/api/recipes/${recipe.id}/cooked`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(res => cookedBtn.classList.remove('statusOn'));

                } else if (willCookBtn.classList.contains('statusOn')) {

                    fetch(`/api/recipes/${recipe.id}/cooked`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(res => {
                        cookedBtn.classList.add('statusOn')
                        willCookBtn.classList.remove('statusOn')
                    })

                } else {
                    fetch(`/api/recipes/${recipe.id}/cooked`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }).then(res => cookedBtn.classList.add('statusOn'))
                }
            })


        } else {
            statusContainerCheck.remove();
            addStatusBtn.innerHTML = 'Add status';
        }
    })




    function createBtn (className) {
        const btn = document.createElement('button');
        btn.classList.add('status-btn');
        btn.classList.add(className);
        return btn;
    }

})
