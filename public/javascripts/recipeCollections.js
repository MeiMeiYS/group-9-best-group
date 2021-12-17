

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

const addToCollection = () => {
    // const select = document.getElementsByName('collections');
    // const collectionId = select.options[select.selectedIndex].value;
    // const collectionName = select.options[select.selectedIndex].text;
    const select = document.getElementById('collection-select')

    const collectionId = select.value;
    const recipeId = document.querySelector('.recipe-id').textContent;

    fetch('/api/recipecollections', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionId, recipeId })
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data)

        const newRecipeCollection = data.newRecipeCollection;

        if (newRecipeCollection) {
            console.log('Success')
        }
    })
}


