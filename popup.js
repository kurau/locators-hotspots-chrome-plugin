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
        console.log("xhr.readystate = " + xhr.readyState);
        if (xhr.readyState === 4) {
            console.log("xhr" + xhr.response.length);
            console.log("xhr" + typeof(xhr.responseText));

            var data = JSON.parse(xhr.responseText);

            var pagesList = JSON.stringify(JSON.stringify(data.pages));

            var testsList = JSON.stringify(JSON.stringify(data.tests));

            chrome.storage.local.set({"locators": pagesList}, function () {
            });

            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.executeScript(
                    tabs[0].id, {
                        code: `localStorage.setItem("testsList", ${testsList});`
                    });
            });
        }
    };
    showPages();
}

function showData(pageName) {
    chrome.storage.local.get(["locators"], function (items) {

        var json = JSON.parse(JSON.parse(items.locators));

        var pages = json;
        var stringify;
        if (pageName !== undefined) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].page === pageName) {
                    stringify = [pages[i]];
                }
            }
        } else {
            stringify = pages;
        }


        var lctrs = JSON.stringify(JSON.stringify(stringify));
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id, {
                    code: `localStorage.setItem("locators", ${lctrs});`
                });
        });

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.insertCSS({file: "onpage/main.css"});
            chrome.tabs.insertCSS({file: "onpage/general.css"});
            chrome.tabs.insertCSS({file: "onpage/sidebar.css"});
            chrome.tabs.executeScript({file: "scripts/fontawesome.js"});
            chrome.tabs.executeScript({file: "scripts/moment.min.js"});

            chrome.tabs.executeScript({file: "onpage/split-page.js"}, function () {
                chrome.tabs.executeScript({file: "onpage/show-locators.js"}, function () {
                    chrome.tabs.executeScript({file: "onpage/show-info.js"})
                })
            });
        });
    });
}

function showPages() {
    chrome.storage.local.get(['locators'], function (result) {

        var json = JSON.parse(JSON.parse(result.locators));
        var pages = document.querySelectorAll('*[class*="pages"]');
        for (var index = 0; index < pages.length; index++) {
            pages[index].remove();
        }

        for (var i = 0; i < json.length; i++) {
            (function (e) {
                div = document.createElement("div");
                div.classList.add("pages");
                a = document.createElement("a");
                a.role = "button";
                a.href = "#";
                div.style.border = "4px double black";
                div.style.padding = "10px";
                a.innerText = json[e].page + " pins: " + json[e].pins.length;

                a.onclick = function () {
                    console.log("store " + json[e].page);

                    showData(json[e].page);
                };

                div.appendChild(a);
                document.body.appendChild(div);
            }(i))
        }
    });
}

showPages();

