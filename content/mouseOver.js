document.onmouseover = function (event) {
    let target = event.target;

    let isTooltip = target.classList.contains("test-coverage");
    if (isTooltip) {
        printTooltip(target);
    }
};

function printTooltip(target) {
    var parent = target.parentNode;

    markElementTemp(parent);
    target.addEventListener('mouseout', function () {
        unMarkAllTempElements();
    });

    let section1 = document.getElementById("section1");
    section1.innerHTML = target.getAttribute("data-tests");
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
        if (element.getAttribute('class') === '') {
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
