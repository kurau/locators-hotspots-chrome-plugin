let showLocators = document.getElementById('showLocators');
let downloadFile = document.getElementById('downloadFile');

chrome.storage.sync.get('color', function (data) {
    showLocators.style.backgroundColor = data.color;
    showLocators.setAttribute('value', data.color);
});

showLocators.onclick = function () {
    chrome.storage.local.get(["locators"], function (items) {
        console.log(" # " + items.locators)
        var stringify = JSON.stringify(items.locators);
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id, {
                    code: `localStorage.setItem("locators", ${stringify});`
                });
        });
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.insertCSS(tabs[0].id, {
                file : "onpage/main.css"
            });
            chrome.tabs.executeScript(tabs[0].id, { file: "onpage/split-page.js" }, function() {
                    chrome.tabs.executeScript(tabs[0].id, { file: "onpage/show-locators.js" }, function() {
                        chrome.tabs.executeScript(tabs[0].id, { file: "onpage/show-info.js" })
                    })
                });
        });
    });
};

downloadFile.onclick = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "file:///Users/kurau/git/locators-hotspots-chrome-plugin/data/locators3.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var resp = JSON.parse(xhr.responseText);
            console.log(" -> " + JSON.stringify(resp, null, 2));
            chrome.storage.local.set({"locators": xhr.responseText}, function () {
            });
        }
    };
    xhr.send();
};

