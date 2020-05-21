"use strict";

let testData;

function showPinsAction() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {text: "showSource", action: SHOW_SOURCE, data: testData}, function(response) {
            console.log(" show sent " + response.text);
        });
    });

}

function pinInfoAction(pinInfo) {
    let pinData = JSON.parse(pinInfo);

    let infoBar = '<ul class="test-list">';
    infoBar += getTestItems(pinData);
    infoBar += '</ul>';

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {text: "pinInfo", action: "pinInfo", data: infoBar}, function(response) {
            console.log(" show sent " + response.text);
        });
    });
}

function downloadDataAction(source) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", source);
    xhr.timeout = 10000;
    xhr.send();
    xhr.onreadystatechange = function () {
        console.log("xhr.readystate = " + xhr.readyState);
        if (xhr.readyState === 4) {
            console.log("xhr" + xhr.response.length);
            console.log("xhr" + typeof(xhr.responseText));

            testData = JSON.parse(xhr.responseText);
        }
    };
}

function getTestItems(locator) {
    let items = "";

    var steps = locator.steps;
    for (var test in steps) {

        items += '<li class="test-item">';
        items += `<i class="fa fa-check-circle status status-passed" aria-hidden="true"></i>`;
        items += `<button type="button" class="coverage-collapsible">${testMap.get(test)[0].test}</button>`;
        items += `<div class="coverage-content">`;
        console.log(test);
        console.log(testMap.get(test).length);
        for (var i = 0; i < testMap.get(test).length; i++) {
            var s = testMap.get(test)[i];
            items += `<p><div class="step-navigate" data-tests="${s.fullPath}">${s.stepDescription}</div></p>`;
        }
        items += `</div>`;
        items += '</li>'
    }
    return items;
}
