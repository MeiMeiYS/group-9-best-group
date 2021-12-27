let highlight = document.querySelector(".highlight");
let urlInput = document.querySelector("input#url")
let imageOption = document.querySelectorAll(".image-option");
let fadeControl = document.querySelector('.fade')

urlInput.addEventListener('click', (e) => {
    e.target.value = ''
    e.target.setAttribute(
        "style",
        `color: #56423e`
    )

    fadeControl.setAttribute(
        "style",
        `opacity: 100%`
    )

    highlight.setAttribute(
        "style",
        `display: hidden`
    )
})

imageOption.forEach((option) => {
    option.addEventListener("click", (e) => {
        let x = e.target.offsetLeft - 15;
        let y = e.target.offsetTop - 15;
        let border = e.target.dataset.color;
        highlight.setAttribute(
            "style",
            `--x: ${x-231}px; --y: ${y-625}px; --border: ${border}; display: visible`
        );

        urlInput.value = e.target.dataset.url
        urlInput.setAttribute(
            "style",
            `color: white`
        )

        fadeControl.setAttribute(
            "style",
            `opacity: 50%`
        )
    });

    // let x = imageOption[0].offsetLeft - 15;
    // let y = imageOption[0].offsetTop - 15;
    // let border = imageOption[0].dataset.color;

    highlight.setAttribute(
        "style",
        `display: hidden`
    );
});
