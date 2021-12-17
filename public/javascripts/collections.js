
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

        await fetch("/api/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name})
        })
        .then(res => {
            console.log({res})
            return res.json()
        })
        .then(data => {
            // console.log(data)
            let newCollection = data.newCollection;

            if (newCollection) {
                let collectionContainer = document.createElement("div");

                collectionContainer.innerHTML = `
                <div class='collection-header'>
                    <h3>${newCollection.name}</h3>
                    <button class='button' type='submit' onclick='editCollectionName()'>Edit Name</button>
                    <button class='button' type='submit' onclick='deleteCollection()'>Delete Collection</button>
                </div>
                <div class='recipe-list'>
                </div>
                `
            }
        })
    }
}

const editCollectionName = () => {

};

const deleteCollection = () => {
    let name = document.getElementById()
};
