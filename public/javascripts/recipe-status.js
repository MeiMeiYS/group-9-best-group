window.addEventListener("load", (event) => {
    console.log('hiiiii')
    const addStatusBtn = document.querySelector('.add-status')

    addStatusBtn.addEventListener('click', event => {
        const statusContainerCheck = document.querySelector('.status-container');
        if (!statusContainerCheck){
            const statusContainer = document.createElement('div');
            const willCookBtn = createBtn('will-cook');
            willCookBtn.innerHTML = 'Will Cook';
            const cookedBtn = createBtn('cooked');
            cookedBtn.innerHTML = 'Cooked';
            statusContainer.classList.add('status-container');
            statusContainer.appendChild(willCookBtn);
            statusContainer.appendChild(cookedBtn);

            const loginButtons = document.querySelector('.log-in-buttons');
            loginButtons.appendChild(statusContainer);
            addStatusBtn.innerHTML = 'Close';
        } else {
            statusContainerCheck.remove();
            addStatusBtn.innerHTML = 'Add status';
        }










    })



    function createBtn (className) {
        const btn = document.createElement('button');
        btn.classList.add(className);
        return btn;
    }

})
