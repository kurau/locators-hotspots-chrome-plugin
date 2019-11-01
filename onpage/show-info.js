var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");

document.onmouseover = function (event) {
    let target = event.target;

    let isTooltip = target.classList.contains("test-coverage");
    if (!isTooltip) {
        return;
    }

    let title = target.getAttribute("title");
    section1.innerHTML = title;

    let tests = target.getAttribute("data-tests");
    section2.innerHTML = tests;
};

