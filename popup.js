document.getElementById('showLocators').onclick = function () {
    showData()
};

document.getElementById('save').onclick = function () {
    downloadData();
};


function downloadData() {
    let source = document.getElementById('dataSource').value;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", source, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var resp = JSON.parse(xhr.responseText);
            chrome.storage.local.set({"locators": xhr.responseText}, function () {
            });
        }
    };
}

function showData() {
    chrome.storage.local.get(["locators"], function (items) {
        var stringify = JSON.stringify(items.locators);

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id, {
                    code: `localStorage.setItem("locators", ${stringify});`
                });
        });

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.insertCSS( { file : "onpage/main.css" });
            chrome.tabs.insertCSS( { file : "onpage/general.css" });
            chrome.tabs.executeScript( { file: "scripts/fontawesome.js" });
            chrome.tabs.executeScript({ file: "scripts/moment.min.js" });

            chrome.tabs.executeScript({ file: "onpage/split-page.js" }, function() {
                chrome.tabs.executeScript({ file: "onpage/show-locators.js" }, function() {
                    chrome.tabs.executeScript({ file: "onpage/show-info.js" })
                })
            });
        });
    });
}


