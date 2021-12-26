//clicking button to add new collection
const addNewCollection = () => {
    const collectionArea = document.querySelector('.new-collection-form');

    collectionArea.innerHTML = '';

    collectionArea.innerHTML = `<input type="text" id='newCollection' placeholder="Enter New Collection Name"></input>
    <button class='button' id='add-collection' type='submit' onclick='constructCollection()'>Add
    </button><button class='button cancel' id="cancel-collection" type='submit' onclick='cancelAdd()'>Cancel
    </button>`

}
//clicking button to cancel adding collection
const cancelAdd = () => {
    const collectionArea = document.querySelector('.new-collection-form');

    collectionArea.innerHTML = `<button class='collection-button' id='newCollectionBtn' type='submit' onclick='addNewCollection()'>Add New Collection</button>`;
}

//actually submitting new collection
const constructCollection = async () => {
    let name = document.getElementById('newCollection').value;
    const collectionArea = document.querySelector('.new-collection-form');

    if (!name.length) {
        collectionArea.innerHTML = `<input type="text" id='newCollection' placeholder="Please Enter New Collection Name!"></input>
        <button class='button' id='add-collection' type='submit' onclick='constructCollection()'>Add
        </button><button class='button cancel' id="cancel-collection" type='submit' onclick='cancelAdd()'>Cancel
        </button>`
    } else {
        collectionArea.innerHTML = `<input type="text" id='newCollection' placeholder="Enter New Collection Name"></input>
        <button class='button' id='add-collection' type='submit' onclick='constructCollection()'>Add
        </button><button class='button cancel' id="cancel-collection" type='submit' onclick='cancelAdd()'>Cancel
        </button>`;

        const res = await fetch("/api/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name })
        })
        const data = await res.json()

        let newCollection = data.newCollection;

        if (newCollection) {
            let collectionContainer = document.querySelector('.all-collections');

            collectionContainer.innerHTML += `
                <div class=collectionContainer>
                    <div class='collection-header'>
                        <h3>${newCollection.name}</h3>
                        <h3 hidden>${newCollection.id}</h3>
                        <div class='editCollection'>
                            <button class='collection-button' id='editCollection' type='submit' onclick='editCollectionName(this)'>Edit Name</button>
                        </div>
                        <div class='deleteCollection'>
                            <button class='collection-button' id='deleteCollection' type='submit' onclick='deleteCollection(this)'>Delete Collection</button>
                        </div>
                        <div class='recipe-list' id=${newCollection.id}>
                            <button class='collection-button' id='viewCollection-${newCollection.id}' type='submit' onclick='viewCollection(this)'>View Recipes</button>
                            <div id='recipe-view-${newCollection.id}' style='display:none'></div>
                        </div>
                    </div>
                </div>
                `
        }
    }
}
//clicking button to edit a collection name
const editCollectionName = (target) => {
    const collectionArea = target.parentElement;

    collectionArea.innerHTML = '';

    collectionArea.innerHTML = `
    <input type="text" id='updateCollection' placeholder="Enter New Collection Name"></input>
    <button class='button' id='edit-collection' type='submit' onclick='changeCollectionName(this)'>Edit
    </button>
    <button class='button cancel' id='cancel-collection-edit' type='submit' onclick='cancelEdit(this)'>Cancel
    </button>`
}
//clicking button to cancel editting a collection
const cancelEdit = (target) => {
    const collectionArea = target.parentElement;

    collectionArea.innerHTML = `<button class='collection-button' id='editCollection' type='submit' onclick='editCollectionName(this)'>Edit Name</button>`;
}

//actually changing collection name
const changeCollectionName = (target) => {
    //grabbed the previous sibling of the div and its text content
    let collectionId = target.parentElement.previousElementSibling.textContent;

    let name = document.getElementById('updateCollection').value;

    const collectionArea = target.parentElement;

    if (!name.length) {
        collectionArea.innerHTML = `<input type="text" id='updateCollection' placeholder="Please Enter New Collection Name"></input>
        <button class='button' id='edit-collection' type='submit' onclick='changeCollectionName(this)'>Edit
        </button>
        <button class='button cancel' id='cancel-collection-edit' type='submit' onclick='cancelEdit(this)'>Cancel
        </button>`
    } else {

        fetch(`/api/collections/${collectionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name })
        })
            .then(res => {
                //console.log({res})
                return res.json()
            })
            .then(data => {
                //console.log(data)
                let updatedCollection = data.collection;
                console.log(updatedCollection)

                if (updatedCollection) {
                    collectionArea.innerHTML = `<button class='collection-button' type='submit' onclick='editCollectionName(this)'>Edit Name</button>`;
                    console.log(collectionArea.previousElementSibling.previousElementSibling)

                    collectionArea.previousElementSibling.previousElementSibling.textContent = updatedCollection.name;
                }
            })

    }

};


//deleting collection
const deleteCollection = async (target) => {
    //grabbed the previous, previous sibling (h3) and got the text content to get collection name
    let collectionId = target.parentElement.previousElementSibling.previousElementSibling.textContent;

    const collectionContainer = target.parentElement.parentElement.parentElement

    fetch(`/api/collections/${collectionId}`, {
        method: "DELETE",
    })
        .then(res => {
            return res.json()
        })
        .then(data => {
            collectionContainer.innerHTML = data.message;

            setTimeout(function () {
                collectionContainer.remove();
            }, 1800)
        })

};




//click button to view recipes that are in a collection
const viewCollection = async (target) => {
    let collectionId = target.parentElement.id;

    const button = document.querySelector(`#viewCollection-${collectionId}`);

    // //const recipeView = document.getElementById(`recipe-view-${collectionId}`);
    const collectionContainer = target.parentElement.parentElement.parentElement;

    const recipeCardsDiv = document.createElement('div');
    recipeCardsDiv.classList.add('recipe-card-div');
    recipeCardsDiv.setAttribute('id', `recipe-card-${collectionId}`)



    if (button.innerHTML === 'View Recipes') {
        button.innerHTML = 'Hide Recipes';
        //want to fetch the data
        const res = await fetch(`/api/collections/${collectionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json()
        const recipesInCollection = data.recipes;
        //if there are recipes, want to make a recipe card for each recipe to put in the recipeCardsDiv

        if (recipeCardsDiv) {
            if (recipesInCollection.length > 0) {
                for (let i = 0; i < recipesInCollection.length; i++) {
                    let recipe = recipesInCollection[i];
                    recipeCardsDiv.innerHTML += `
                <div class="card" id="card-${recipe.id}-${collectionId}">
                    <img src="${recipe.Image.url}" alt="recipe-image">
                        <div class="title">
                            <h3>${recipe.name}</h3>
                        </div>
                        <div class="view-button">
                            <a class="button" href="/recipes/${recipe.id}">View Recipe</a>
                        </div>
                    <button class='delete-recipe-from-collection' id='remove-recipe-${recipe.id}' type='submit' onclick='removeFromCollection(this)'>Remove</button>
                    `
                }
            } else {
                recipeCardsDiv.innerHTML += `
                <p>No recipes have been added yet!</p>
                `
            }
        }

        collectionContainer.appendChild(recipeCardsDiv);


    } else {
        button.innerHTML = 'View Recipes';
        const currentRecipeCardsDiv = document.querySelector(`#recipe-card-${collectionId}`);
        console.log(currentRecipeCardsDiv);
        currentRecipeCardsDiv.remove();
        console.log('removed!!!!!!!!!!!! ')
    }



}

//click button on recipe that removes a recipe from a collection
const removeFromCollection = async (target) => {
    //get button id and split to string then get the recipeId that is last
    const idArr = target.id.split("-");
    const recipeId = idArr[2];

    //get id of parent div that has collectionId in id
    const collectionIdArr = target.parentElement.parentElement.id.split("-");
    const collectionId = collectionIdArr[2];

    const res = await fetch(`/api/recipecollections/${recipeId}/${collectionId}`, {
        method: "DELETE",
    })
    const data = await res.json();

    const recipeCard = document.querySelector(`#card-${recipeId}-${collectionId}`);


    // const alertArea = document.querySelector('#show-alert');

    // alertArea.style.display = 'block';
    recipeCard.innerHTML = `${data.message}`

    setTimeout(function () {
        recipeCard.remove();
        // alertArea.style = "display:none"
    }, 1850)

}

