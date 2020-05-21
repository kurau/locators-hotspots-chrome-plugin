"use strict";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log(" ON MESSAGE CONTEXT ");

        if (request.action === SHOW_SOURCE) {
            var splattedBody = document.getElementById('bodyWrapper');
            if (typeof(splattedBody) === 'undefined' || splattedBody === null) {
                splitAndShowInfo(request.data);
            }
            removePrevElements();
            showElements(request.data);

            sendResponse({text: "ok"});
        }

        // if (request.action === SHOW_PIN_INFO) {
        //     pinInfo(request.data);
        //     sendResponse({text: "ok"});
        // }

    });
