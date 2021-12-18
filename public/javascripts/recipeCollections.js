

const getCollectionForm = () => {
    const button = document.querySelector('.add-collection');

    const collectionChoices = document.getElementById('collection-choices');
    if (collectionChoices.style.display === 'none') {
        collectionChoices.style.display = 'block';
        button.innerHTML = 'Cancel Adding'
    } else {
        collectionChoices.style.display = 'none';
        button.innerHTML = 'Add To Collection'
    }

}

const addToCollection = async () => {
    const select = document.getElementById('collection-select')

    const collectionId = select.value;
    const recipeId = document.querySelector('.recipe-id').textContent;

    const res = await fetch('/api/recipecollections', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionId, recipeId })
    })
    const data = await res.json()

    console.log(data)

    const newRecipeCollection = data.newRecipeCollection;

    // if (newRecipeCollection) {
            const alertArea = document.querySelector('#show-alert');

            alertArea.style.display = 'block'; 
            alertArea.innerHTML = `${data.message}`

            setTimeout(function() {
                alertArea.style = "display:none"
            }, 1800)
        // }
}


