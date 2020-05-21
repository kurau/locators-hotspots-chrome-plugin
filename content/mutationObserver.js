"use strict";

var isRunning = false;

var config = {subtree: true, childList: true, attributeFilter: ["class", "style"], characterData: true};

var observer = new MutationObserver(function (mutations) {
    for (let mutation of mutations) {
        if (isRunning) {
            break;
        }
        for (let node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) {
                continue;
            }
            if (node.matches(".test-coverage") || node.matches(".test-list")) {
                continue;
            }
            onChanges();
            break;
        }

        if (mutation.attributeName === "class") {
            var className = mutation.target.getAttribute("class");
            if (className.includes("visible")) {
               onChanges();
            }
        }
    }
});

function onChanges() {
    if (inProgress) return;
    chrome.runtime.sendMessage({text: "mutation", type: SHOW_SOURCE}, function (response) {
        console.log(" MUTATION SENT ");
    });
}

function observerStart() {
    observer.disconnect();
}

function observerStop() {
    observer.observe(document, config);
}



