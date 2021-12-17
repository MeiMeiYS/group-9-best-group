
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


const constructCollection = () => {
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

        fetch("/api/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name})
        })
        .then(res => {
            // console.log({res})
            return res.json()
        })
        .then(data => {
            // console.log(data)
            let newCollection = data.newCollection;

            if (newCollection) {
                let collectionContainer = document.querySelector('.all-collections');

                collectionContainer.innerHTML += `
                <div class=collectionContainer>
                    <div class='collection-header'>
                        <h3>${newCollection.name}</h3>
                        <h3 hidden>${newCollection.id}</h3>
                        <div class='editCollection'>
                            <button class='button' type='submit' onclick='editCollectionName(this)'>Edit Name</button>
                        </div>
                        <div class='deleteCollection'>
                            <button class='button' type='submit' onclick='deleteCollection(this)'>Delete Collection</button>
                        </div>
                    </div>
                    <div class='recipe-list'>
                    </div>
                </div>
                `
            }
            //NEED TO FIGURE OUT WHAT ORDER COLLECTIONS COMES IN
        })
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
            body: JSON.stringify({name})
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

    const collectionContainer = target.parentElement.parentElement
    console.log(collectionContainer);

    fetch(`/api/collections/${collectionId}`, {
        method: "DELETE",
    })
    .then(res => {
        collectionContainer.innerHTML = '';
    })

};

const viewCollection = async (target) => {
    let collectionId = target.previousElementSibling.textContent;

    fetch(`/api/collections/${collectionId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => {
        return res.json()
    })
    .then(data => {
        const recipesInCollection = data.collection.Recipe
    })

    // const recipeView = document.getElementsByClassName('recipe-view');
    // if (recipeView.style.display === 'none') {
    //     recipeView.style.display = 'block';
    // } else {
    //     recipeView.style.display = 'none'
    // }
}
