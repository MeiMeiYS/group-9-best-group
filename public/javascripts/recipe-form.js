window.addEventListener("load", (event) => {

    const qmiList = document.querySelector('#qmi-list');
    const qmiRow = document.querySelector('.qmi-row');

    const qmiCountInput = document.querySelector('#qmiCount');
    console.log(qmiCount)

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

    function createDivQmiRow (childElementCount) {
          // create a copy of qmiRow
          const qmiRowClone = qmiRow.cloneNode(true);
          //updating quantity label for attribute
          qmiRowClone.childNodes[0].childNodes[0].setAttribute('for', `quantity-${childElementCount}`);
          //updating quantity label input id and name
          qmiRowClone.childNodes[0].childNodes[1].id = `quantity-${childElementCount}`;
          qmiRowClone.childNodes[0].childNodes[1].setAttribute('name', `quantity-${childElementCount}`);
          //updating measurement label for attribute
          qmiRowClone.childNodes[1].childNodes[0].setAttribute('for', `measurement-${childElementCount}`);
          //updating measurement label input id and name
          qmiRowClone.childNodes[1].childNodes[1].id = `measurement-${childElementCount}`;
          qmiRowClone.childNodes[1].childNodes[1].setAttribute('name', `measurement-${childElementCount}`);
          //updating ingredients label for attribute
          qmiRowClone.childNodes[2].childNodes[0].setAttribute('for', `ingredient-${childElementCount}`);
          //updating ingredients label input id and name
          qmiRowClone.childNodes[2].childNodes[1].id = `ingredient-${childElementCount}`;
          qmiRowClone.childNodes[2].childNodes[1].setAttribute('name', `ingredient-${childElementCount}`);
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

})
