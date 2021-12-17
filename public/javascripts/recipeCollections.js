

const getCollectionForm = () => {
    const button = document.getElementsByClassName('add-collection');

    const collectionChoices = document.getElementById('collection-choices');
    if (collectionChoices.style.display === 'none') {
        collectionChoices.style.display = 'block';
    } else {
        collectionChoices.style.display = 'none'
    }

    console.log('hellooooooo')
}
