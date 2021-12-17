
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
                <div class='collection-header'>
                    <h3>${newCollection.name}</h3>
                    <button class='button' type='submit' onclick='editCollectionName(this)'>Edit Name</button>
                    <button class='button' type='submit' onclick='deleteCollection(this)'>Delete Collection</button>
                </div>
                <div class='recipe-list'>
                </div>
                `
            }
            //NEED TO FIGURE OUT WHAT ORDER COLLECTIONS COMES IN
        })
    }
}

const editCollectionName = (target) => {
    //grabbed the previous sibling in pug file (h3) and its text content
    let collectionId = target.previousElementSibling.textContent;
    console.log(collectionId);

};

const deleteCollection = async (target) => {
    //grabbed the previous, previous sibling (h3) and got the text content to get collection name
    let collectionId = target.previousElementSibling.previousElementSibling.textContent;
    console.log(collectionId);


    fetch(`/api/collections/${collectionId}`, {
        method: "DELETE",
    })


};
