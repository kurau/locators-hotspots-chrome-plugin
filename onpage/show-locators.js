var arr1 = JSON.parse(localStorage.getItem('locators'));

function getTestItems(locator) {
    let items = "";
    locator.tests.forEach(test => {
        let duration = moment.duration(test.duration, 'milliseconds');
        let durationTime = moment()
            .seconds(duration.seconds())
            .minutes(duration.minutes())
            .format('mm:ss');
        items += '<li class="test-item">';
        items += `<i class="fa fa-check-circle status status-${test.status}" aria-hidden="true"></i>`;
        if (test.url) {
            items += `<a target="_blank" href="${test.url}">${test.name}</a>`;
        } else {
            items += `<span>${test.name}</span>`
        }
        items += `<span style="padding-left: 5px; color: gray">(${durationTime})</span>`;
        items += '</li>'
    });
    return items;
}

function addPin(element, currentNode) {
    let pin = document.createElement('span');
    pin.classList.add("test-coverage");
    pin.classList.add("coveragePin");
    pin.style.zIndex = 1002;
    pin.innerHTML = currentNode.tests.length;
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

function findElement(node) {
    var elem;
    var elemCandidate;
    var paths = pathsByLocator(node.fullPath);

    for (var i = 0; i < paths.length; i++) {
        try {
            elemCandidate = document
                .evaluate(
                    paths[i],
                    document.getElementById("bodyWrapper"), null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                .singleNodeValue;

            if (elemCandidate === null) {
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
            if (!elem.classList.contains("Popup_visible")) {
                elem.style.position = "relative";
            }
            addPin(elem, node);
        } catch (err) {
            console.log(" err ");
        }

    }

    return elem;
}

function showElements(subArr) {
    var t0 = performance.now();
    for (let i in subArr) {
        findElement(subArr[i]);
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

// var observer = new MutationObserver(function (mutations) {
//     for (let mutation of mutations) {
//         if (hasNewNode) {
//             break;
//         }
//         for (let node of mutation.addedNodes) {
//             if (!(node instanceof HTMLElement)) {
//                 continue;
//             }
//             if (node.matches(".test-coverage")) {
//                 continue;
//             }
//             hasNewNode = true;
//             break;
//         }
//     }
// });
// observer.observe(document.getElementById("bodyWrapper"), {subtree: true, childList: true});
//
isWroomWoroom = false;

function wroomwroom() {
    console.log(" wroom? " + isWroomWoroom);
    if (!isWroomWoroom) {
        isWroomWoroom = true;
        removePrevElements();
        showElements(arr1);
    }
    isWroomWoroom = false;
    console.log(" WROOM DONE ");
}
//
// setInterval(wroomwroom, 1000);

wroomwroom();
