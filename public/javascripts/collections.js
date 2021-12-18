
const addNewCollection = () => {
    const collectionArea = document.querySelector('.new-collection-form');

    collectionArea.innerHTML = '';

    collectionArea.innerHTML = `<input type="text" id='newCollection' placeholder="Enter New Collection Name"></input>
    <button class='button' type='submit' onclick='constructCollection()'><i class="fas fa-plus-circle"></i>
    </button><button class='button cancel' type='submit' onclick='cancelAdd()'><i class="fas fa-times-circle"></i>
    </button>`

}

const cancelAdd = () => {
    const collectionArea = document.querySelector('.new-collection-form');

    collectionArea.innerHTML = `<button class='button' id='newCollectionBtn' type='submit' onclick='addNewCollection()'>Add</button>`;
}


const constructCollection = async () => {
    let name = document.getElementById('newCollection').value;
    const collectionArea = document.querySelector('.new-collection-form');

    if (!name.length) {
        collectionArea.innerHTML = `<input type="text" id='newCollection' placeholder="Please Enter New Collection Name!"></input>
        <button class='button' type='submit' onclick='constructCollection()'><i class="fas fa-plus-circle"></i>
        </button><button class='button cancel' type='submit' onclick='cancelAdd()'><i class="fas fa-times-circle"></i>
        </button>`
    } else {
        collectionArea.innerHTML = `<input type="text" id='newCollection' placeholder="Enter New Collection Name"></input>
        <button class='button' type='submit' onclick='constructCollection()'><i class="fas fa-plus-circle"></i>
        </button><button class='button cancel' type='submit' onclick='cancelAdd()'><i class="fas fa-times-circle"></i>
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
                            <button class='button' id='editCollection' type='submit' onclick='editCollectionName(this)'>Edit Name</button>
                        </div>
                        <div class='deleteCollection'>
                            <button class='button' id='deleteCollection' type='submit' onclick='deleteCollection(this)'>Delete Collection</button>
                        </div>
                        <div class='recipe-list' id=${newCollection.id}>
                            <button class='button' id='viewCollection-${newCollection.id}' type='submit' onclick='viewCollection(this)'>View Recipes</button>
                            <div id='recipe-view-${newCollection.id}' style='display:none'></div>
                        </div>
                    </div>
                </div>
                `
        }
    }
}

const editCollectionName = (target) => {
    const collectionArea = target.parentElement;

    collectionArea.innerHTML = '';

    collectionArea.innerHTML = `
    <input type="text" id='updateCollection' placeholder="Enter New Collection Name"></input>
    <button class='button' type='submit' onclick='changeCollectionName(this)'><i class="fas fa-plus-circle"></i>
    </button>
    <button class='button cancel' type='submit' onclick='cancelEdit(this)'><i class="fas fa-times-circle"></i>
    </button>`
}

const cancelEdit = (target) => {
    const collectionArea = target.parentElement;

    collectionArea.innerHTML = `<button class='button' id='editCollection' type='submit' onclick='editCollectionName(this)'>Edit Name</button>`;
}


const changeCollectionName = (target) => {
    //grabbed the previous sibling of the div and its text content
    let collectionId = target.parentElement.previousElementSibling.textContent;
    //console.log(collectionId);

    let name = document.getElementById('updateCollection').value;

    const collectionArea = target.parentElement;

    //console.log(name)

    if (!name.length) {
        collectionArea.innerHTML = `<input type="text" id='updateCollection' placeholder="Please Enter New Collection Name"></input>
        <button class='button' type='submit' onclick='changeCollectionName(this)'><i class="fas fa-plus-circle"></i>
        </button>
        <button class='button cancel' type='submit' onclick='cancelEdit(this)'><i class="fas fa-times-circle"></i>
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
                    collectionArea.innerHTML = `<button class='button' type='submit' onclick='editCollectionName(this)'>Edit Name</button>`;
                    console.log(collectionArea.previousElementSibling.previousElementSibling)

                    collectionArea.previousElementSibling.previousElementSibling.textContent = updatedCollection.name;
                }
            })

    }

};



const deleteCollection = async (target) => {
    //grabbed the previous, previous sibling (h3) and got the text content to get collection name
    let collectionId = target.parentElement.previousElementSibling.previousElementSibling.textContent;
    console.log(collectionId);

    const collectionContainer = target.parentElement.parentElement.parentElement
    console.log(collectionContainer);

    fetch(`/api/collections/${collectionId}`, {
        method: "DELETE",
    })
        .then(res => {
            collectionContainer.remove();
        })

};





const viewCollection = async (target) => {
    let collectionId = target.parentElement.id;

    //console.log(collectionId);

    const button = document.querySelector(`#viewCollection-${collectionId}`);

    const recipeView = document.getElementById(`recipe-view-${collectionId}`);

    //console.log(recipeView);
    if (recipeView.style.display === 'none') {
        recipeView.style.display = 'block';
        button.innerHTML = 'Hide Recipes'
    } else {
        recipeView.style.display = 'none';
        button.innerHTML = 'View Recipes'
    }


    const res = await fetch(`/api/collections/${collectionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const data = await res.json()
    const recipesInCollection = data.recipes;
    // console.log(recipesInCollection);

    if (recipeView.innerHTML === '') {
        if (recipesInCollection.length > 0) {
            for (let i = 0; i < recipesInCollection.length; i++) {
                let recipe = recipesInCollection[i];
                recipeView.innerHTML += `
                <div class="card" id="card-${recipe.id}">
                    <img src="${recipe.Image.url}" alt="recipe-image">
                        <div class="title">
                            <h3>${recipe.name}</h3>
                        </div>
                        <div class="view-button">
                            <a class="button" href="/recipes/${recipe.id}">View Recipe</a>
                        </div>
                    <button class='button' id='remove-recipe-${recipe.id}' type='submit' onclick='removeFromCollection(this)'>Remove</button>
                    `
            }
        } else {
            recipeView.innerHTML += `
                <p>No recipes have been added yet!</p>
                `
        }
    }
}

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

    const recipeCard = document.querySelector(`#card-${recipeId}`);


    // const alertArea = document.querySelector('#show-alert');

    // alertArea.style.display = 'block';
    recipeCard.innerHTML = `${data.message}`

    setTimeout(function() {
        recipeCard.remove();
        // alertArea.style = "display:none"
    }, 1800)

}

