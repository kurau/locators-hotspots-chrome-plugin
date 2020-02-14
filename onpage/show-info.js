var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");

document.onmouseover = function (event) {
    let target = event.target;

    let isTooltip = target.classList.contains("test-coverage");
    if (!isTooltip) {
        return;
    }

    let tests = target.getAttribute("data-tests");
    section1.innerHTML = tests;

    let title = target.getAttribute("title");
    section2.innerHTML = title;

};

