var arr1 = JSON.parse(localStorage.getItem('locators'));

var coverageInfo = document.getElementById("coverageInfoBar");

let hasNewNode = false;

function addPin(element, currentNode) {
    let pin = document.createElement('div');
    pin.classList.add("test-coverage");
    pin.classList.add("coveragePin");
    pin.style.zIndex = 1002;
    // pin.innerHTML = getMapSize(currentNode.tests).toString();
    pin.innerHTML = "1";
    pin.setAttribute("title", currentNode.meta.fullPath);
    let tests = "";
    for (let k in currentNode.tests) {
        tests = tests + k + '</br>';
    }
    pin.setAttribute("data-tests", tests);

    element.style.position = "relative";
    element.appendChild(pin);
}

function getMapSize(x) {
    var len = 0;
    for (var count in x) {
        len++;
    }
    return len;
}

function findElement(node) {
    let elem;
    let elem1 = document.evaluate(node.meta.fullPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;
    if (elem1 == null) {
        return null;
    }

    if (node.meta.fullPath.includes("input")) {
        elem = elem1.parentNode
    } else {
        elem = elem1;
    }
    return elem;
}

function showElements(subArr) {
    for (let i in subArr) {
        let current = subArr[i];

        if (!current.meta.fullPath) {
            if(Array.isArray(current.child) && current.child.length) {
                showElements(current.child);
            }
            continue;
        }

        let elem = findElement(current);
        if (elem == null) {
            continue;
        }


        addPin(elem, current);
    }
}

function removePrevElements() {
    var oldElements = document.getElementsByClassName("test-coverage");
    for (var i = 0; i < oldElements.length; i++) {
        oldElements[i].remove();
    }
}

removePrevElements();
showElements(arr1);

var observer = new MutationObserver(function(mutations) {
    for(let mutation of mutations) {
        if (hasNewNode) {
            break;
        }
        for(let node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) {
                continue;
            }
            if (node.matches(".test-coverage")) {
                continue;
            }
            hasNewNode = true;
            break;
        }
    }
    if (hasNewNode) {
        removePrevElements();
        showElements(arr1);
        hasNewNode = false;
    }

});
observer.observe(document.body, {subtree: true, childList: true});
