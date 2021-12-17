window.addEventListener("load", (event) => {

    const qmiList = document.querySelector('#qmi-list');
    const qmiRow = document.querySelector('.qmi-row');

    const qmiCountInput = document.querySelector('#qmiCount');

    //to check if uantity input is valid
    const quantityInput1 = document.querySelector('#quantity-1');
    quantityInput1.addEventListener('change', (event) => {
        if (event.target.value !== Math.round(event.target.value * 100) / 100) {
            event.target.value = Math.round(event.target.value * 100) / 100
        }
    })

    //check if ther is a name input
    const recipeNameInput = document.querySelector('#name');
    recipeNameInput.addEventListener('keydown', (event) => {
        const nameValidationMsg = document.querySelector('.nameValidationMsg');
        const recipeNameDiv = recipeNameInput.parentElement;
        if (!event.target.value){
            if (! nameValidationMsg) {
                const spanTag = createSpanTag ('nameValidationMsg', 'Please enter a name for your recipe', 'darkred')
                recipeNameDiv.insertBefore(spanTag, recipeNameInput)
            } else {
                nameValidationMsg.innerHTML = 'Please enter a name for your recipe';
            }
        } else if (event.target.value.length < 5){
            if (! nameValidationMsg) {
                const spanTag = createSpanTag ('nameValidationMsg', 'Recipe name is too short', 'darkred')
                recipeNameDiv.insertBefore(spanTag, recipeNameInput)
            } else {
                nameValidationMsg.innerHTML = 'Recipe name is too short';
            }
        } else {
            const nameValidationMsg = document.querySelector('.nameValidationMsg');
            if (nameValidationMsg) nameValidationMsg.remove();
        }
        checkValidToSubmit ();
    })

    //check if there is description input
    const descriptionInput = document.querySelector('#description');
    descriptionInput.addEventListener('keydown', (event) => {
        const descriptionValidationMsg = document.querySelector('.descriptionValidationMsg');
        const descriptionDiv = descriptionInput.parentElement;
        if (!event.target.value){
            if (! descriptionValidationMsg) {
                const spanTag = createSpanTag ('descriptionValidationMsg', 'Please enter description for your recipe', 'darkred')
                descriptionDiv.insertBefore(spanTag, descriptionInput)
            } else {
                descriptionValidationMsg.innerHTML = 'Please enter description for your recipe';
            }
        } else if (event.target.value.length < 10){
            if (! descriptionValidationMsg) {
                const spanTag = createSpanTag ('descriptionValidationMsg', 'Recipe description is too short', 'darkred')
                descriptionDiv.insertBefore(spanTag, descriptionInput)
            } else {
                descriptionValidationMsg.innerHTML = 'Recipe description is too short';
            }
        } else {
            const descriptionValidationMsg = document.querySelector('.descriptionValidationMsg');
            if (descriptionValidationMsg) descriptionValidationMsg.remove();
        }
        checkValidToSubmit ();
    })

     //check if there is steps input
     const stepsInput = document.querySelector('#steps');
     stepsInput.addEventListener('keydown', (event) => {
         const stepsValidationMsg = document.querySelector('.stepsValidationMsg');
         const stepsDiv = stepsInput.parentElement;
         if (!event.target.value){
             if (! stepsValidationMsg) {
                 const spanTag = createSpanTag ('stepsValidationMsg', 'Please enter steps for your recipe', 'darkred')
                 stepsDiv.insertBefore(spanTag, stepsInput)
             } else {
                stepsValidationMsg.innerHTML = 'Please enter steps for your recipe';
             }
         } else if (event.target.value.length < 15){
             if (! stepsValidationMsg) {
                 const spanTag = createSpanTag ('stepsValidationMsg', 'Recipe steps is too short', 'darkred')
                 stepsDiv.insertBefore(spanTag, stepsInput)
             } else {
                stepsValidationMsg.innerHTML = 'Recipe steps is too short';
             }
         } else {
             const stepsValidationMsg = document.querySelector('.stepsValidationMsg');
             if (stepsValidationMsg) stepsValidationMsg.remove();
         }
         checkValidToSubmit ();
     })


    //url input validator
    const imageURLInput = document.querySelector('#imageURL');
    imageURLInput.addEventListener('keydown', (event) => {
        const imageURLDiv = imageURLInput.parentElement;
        if (event.target.value.length > 600){
            const urlValidationMsg = document.querySelector('.urlValidationMsg');
            if (! urlValidationMsg) {
                const spanTag = createSpanTag ('urlValidationMsg', 'Image URL can not be more than 600 character', 'darkred')
                imageURLDiv.insertBefore(spanTag, imageURLInput)
                event.target.value = '';
            }
        } else {
            const urlValidationMsg = document.querySelector('.urlValidationMsg');
            if (urlValidationMsg) urlValidationMsg.remove();
        }
        checkValidToSubmit ();
    })


    // When click on the newQmiRow button, page will populate a new qmi div
    const newQmiRowBtn = document.querySelector('#new-qmi-row');
    newQmiRowBtn.addEventListener('click', event => {
        event.preventDefault();
        const newQmiRowDiv = createDivQmiRow(qmiList.childElementCount + 1)
        qmiList.append(newQmiRowDiv)

    })

    //when click on this delete ingredient button, this qmiRow will be deleted
    //if there is only one qmiRow left, then only values inside will be cleared out
    //an alert will show up saying you need at least one ingredient.
    qmiList.addEventListener('click', (event) => {
        event.preventDefault();
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
          return;
        }

        if (qmiList.childElementCount > 1){
            event.target.parentNode.remove();
            resetId();
        } else {
            alert('You need at least one ingredient.');
        }

      })



      function checkValidToSubmit () {
          const submitBtn = document.querySelector('.submit').childNodes[0];
          const nameValidationMsg = document.querySelector('.nameValidationMsg');
          const descriptionValidationMsg = document.querySelector('.descriptionValidationMsg');
          const urlValidationMsg = document.querySelector('.urlValidationMsg');
          const stepsValidationMsg = document.querySelector('.stepsValidationMsg');
        if (nameValidationMsg || descriptionValidationMsg || urlValidationMsg || stepsValidationMsg) {
            submitBtn.setAttribute("disabled", "");
            console.log('2')
        } else {
            submitBtn.removeAttribute("disabled");
            console.log('3')
        }
        console.log('1')
      }


    function createDivQmiRow (childElementCount) {
          // create a copy of qmiRow
          const qmiRowClone = qmiRow.cloneNode(true);
          //updating quantity label for attribute
          qmiRowClone.childNodes[0].childNodes[0].setAttribute('for', `quantity-${childElementCount}`);
          //updating quantity input id and name
          qmiRowClone.childNodes[0].childNodes[1].id = `quantity-${childElementCount}`;
          qmiRowClone.childNodes[0].childNodes[1].setAttribute('name', `quantity-${childElementCount}`);
          qmiRowClone.childNodes[0].childNodes[1].value = null
          //updating measurement label for attribute
          qmiRowClone.childNodes[1].childNodes[0].setAttribute('for', `measurement-${childElementCount}`);
          //updating measurement input id and name
          qmiRowClone.childNodes[1].childNodes[1].id = `measurement-${childElementCount}`;
          qmiRowClone.childNodes[1].childNodes[1].setAttribute('name', `measurement-${childElementCount}`);
          qmiRowClone.childNodes[1].childNodes[1].value = null
          //updating ingredients label for attribute
          qmiRowClone.childNodes[2].childNodes[0].setAttribute('for', `ingredient-${childElementCount}`);
          //updating ingredients input id and name
          qmiRowClone.childNodes[2].childNodes[1].id = `ingredient-${childElementCount}`;
          qmiRowClone.childNodes[2].childNodes[1].setAttribute('name', `ingredient-${childElementCount}`);
          qmiRowClone.childNodes[2].childNodes[1].value = null
          //update qmi count
          qmiCountInput.setAttribute('value', qmiList.childElementCount + 1 )
        return qmiRowClone;
    }

    function resetId () {
        const qmiCount = qmiList.childElementCount
        qmiCountInput.setAttribute('value', qmiList.childElementCount )
        for (let i = 0; i < qmiCount; i++ ){
            //updating quantity label for attribute
            qmiList.childNodes[i].childNodes[0].childNodes[0].setAttribute('for', `quantity-${i + 1}`);
            //updating quantity label input id and name
            qmiList.childNodes[i].childNodes[0].childNodes[1].id = `quantity-${i + 1}`;
            qmiList.childNodes[i].childNodes[0].childNodes[1].setAttribute('name', `quantity-${i + 1}`);
            //updating measurement label for attribute
            qmiList.childNodes[i].childNodes[1].childNodes[0].setAttribute('for', `measurement-${i + 1}`);
            //updating measurement label input id and name
            qmiList.childNodes[i].childNodes[1].childNodes[1].id = `measurement-${i + 1}`;
            qmiList.childNodes[i].childNodes[1].childNodes[1].setAttribute('name', `measurement-${i + 1}`);
            //updating ingredients label for attribute
            qmiList.childNodes[i].childNodes[2].childNodes[0].setAttribute('for', `ingredient-${i + 1}`);
            //updating ingredients label input id and name
            qmiList.childNodes[i].childNodes[2].childNodes[1].id = `ingredient-${i + 1}`;
            qmiList.childNodes[i].childNodes[2].childNodes[1].setAttribute('name', `ingredient-${i + 1}`);
        }
        return;
    }

    function createSpanTag (className, innerText, color = 'black') {
        const spanTag = document.createElement("span");
        spanTag.classList.add(className);
        spanTag.innerText = `* ${innerText}`;
        spanTag.style.color = color;
        return spanTag;
    }



})
