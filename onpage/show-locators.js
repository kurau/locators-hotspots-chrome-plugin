var arr1 = JSON.parse(localStorage.getItem('locators'));
var testList = JSON.parse(localStorage.getItem('testsList'));
var testMap = new Map(Object.entries(testList));

function getTestItems(locator) {
    let items = "";

    var steps = locator.steps;
    for (var test in steps) {

        items += '<li class="test-item">';
        items += `<i class="fa fa-check-circle status status-passed" aria-hidden="true"></i>`;
        items += `<button type="button" class="collapsible">${testMap.get(test)[0].test}</button>`;
        items += `<div class="content">`;
        for (var i = 0; i < testMap.get(test).length; i++) {
            var s = testMap.get(test)[i];
            items += `<p><div class="step-navigate" data-tests="${s.fullPath}">${s.stepDescription}</div></p>`;
        }
        items += `</div>`;
        items += '</li>'
    }
    return items;
}

function addPin(element, currentNode) {
    let pin = document.createElement('span');
    pin.classList.add("test-coverage");
    pin.classList.add("coveragePin");
    pin.style.zIndex = 1002;
    pin.innerHTML = `${currentNode.count}`;
    pin.setAttribute("title", currentNode.fullPath);
    let tests = '<ul class="test-list">';
    tests += getTestItems(currentNode);
    tests += '</ul>';
    pin.setAttribute("data-tests", tests);

    element.appendChild(pin);
}

function pathsByLocator(xpath) {
    var elements = [];
    try {
        nodeIterator = document
            .evaluate(xpath, document.getElementById("bodyWrapper"), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        for (i = 0; i < nodeIterator.snapshotLength; i++) {
            var elementNumber = i + 1;
            elements.push("(" + xpath + ")" + "[" + elementNumber + "]")
        }
    } catch (err) {

    }
    return elements;
}

function evaluateXPATH(xpath) {
    return document
        .evaluate(
            xpath,
            document.getElementById("bodyWrapper"), null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
}

function findElement(node) {
    var elem;
    var elemCandidate;
    var paths = pathsByLocator(node.fullPath);

    for (var i = 0; i < paths.length; i++) {
        try {
            elemCandidate = evaluateXPATH(paths[i]);

            if (elemCandidate === null) {
                return;
            }

            if (elemCandidate.classList.contains("coveragePin")) {
                return;
            }

            if (elemCandidate.tagName === 'A') {
                elemCandidate.style.position = "relative";
            }

            if (elemCandidate.tagName === 'INPUT') {
                elem = elemCandidate.parentNode;
            } else {
                elem = elemCandidate;
            }

            // some elements cant be showed cause position "relative"
            // in future we can use dict of exclusions
            // above we will observe list of this elements
            if (!elem.classList.contains("Popup_visible")) {
                elem.style.position = "relative";
            }
            addPin(elem, node);
        } catch (err) {
            console.log(" err pin add ");
        }
    }

    return elem;
}

function showElements(subArr) {
    var t0 = performance.now();
    for (let i in subArr) {
        for (let j in subArr[i].pins) {
            findElement(subArr[i].pins[j]);
        }
    }
    var t1 = performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
    console.log(" END ");
}

function removePrevElements() {
    while (document.getElementsByClassName("test-coverage").length > 0)  {
        var oldElements = document.getElementsByClassName("test-coverage");
        var l = oldElements.length;
        for (var i = 0; i < l; i++) {
            try {
                oldElements[i].remove();
            } catch (err) {
                console.log(" undefined ");
            }
        }
    }
}

hasNewNode = true;

var observer = new MutationObserver(function (mutations) {
    for (let mutation of mutations) {
        if (hasNewNode) {
            break;
        }
        for (let node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) {
                continue;
            }
            if (node.matches(".test-coverage") || node.matches(".test-list")) {
                continue;
            }
            hasNewNode = true;
            break;
        }

        if (mutation.attributeName === "class") {
            var className = mutation.target.getAttribute("class");
            if (className.includes("visible")) {
                hasNewNode = true;
            }
        }
    }
});

var config = {subtree: true, childList: true, attributeFilter: ["class", "style"], characterData: true};
observer.observe(document, config);


isWroomWoroom = false;

function wroomwroom() {
    if (hasNewNode && !isWroomWoroom) {
        isWroomWoroom = true;
        removePrevElements();
        showElements(arr1);
        hasNewNode = false;
    }
    isWroomWoroom = false;
}

setInterval(wroomwroom, 1000);

wroomwroom();
