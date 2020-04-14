var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('onpage/general.css');
(document.head || document.documentElement).appendChild(style);

var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");

document.onmouseover = function (event) {
    let target = event.target;

    let isTooltip = target.classList.contains("test-coverage");
    let isStep = target.classList.contains("step-navigate");
    if (isTooltip) {
        printTooltip(target);
    } else if (isStep) {
        markStep(target);
    }
};

function printTooltip(target) {
    var parent = target.parentNode;
    markElementTemp(parent);
    target.addEventListener('mouseout', function () {
        unMarkAllTempElements();
    });

    let tests = target.getAttribute("data-tests");
    section1.innerHTML = tests;

    let title = target.getAttribute("title");
    section2.innerHTML = title;

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}

function markStep(target) {
    var xpath = target.getAttribute("data-tests");
    stepElement = evaluateXPATH(xpath);
    if (stepElement === null) {
        return;
    }
    stepElement.scrollIntoView();
    markElementTemp(stepElement);
    target.addEventListener('mouseout', function () {
        unMarkAllTempElements();
    });
}

function markElementTemp(element) {
    if (element) {
        element.classList.add("marked-element-temp")
    }
}

function unMarkAllTempElements() {
    unMarkElements(document.querySelectorAll('*[class*="marked-element-temp"]'), !0);
    unMarkElements(document.querySelectorAll('*[class*="mark-successfully"]'), !0)
}

function unMarkElement(element, isTemp) {
    if (element) {
        if (isTemp) {
            element.classList.remove("mark-successfully");
            element.classList.remove("marked-element-temp")
        } else {
            element.classList.remove("marked-element")
        }
        if (element.getAttribute('class') == '') {
            element.removeAttribute('class')
        } else {
            element.setAttribute('class', element.getAttribute('class').trim())
        }
    }
}

function unMarkElements(elementArr, isTemp) {
    for (var index = 0; index < elementArr.length; index++) {
        unMarkElement(elementArr[index], isTemp)
    }
}
