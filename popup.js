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
    console.log(" show " + pageName);
    chrome.storage.local.get(["locators"], function (items) {

        var json = JSON.parse(JSON.parse(items.locators));

        var pages = json;
        console.log(" pages type ")
        console.log(typeof(pages));
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
        console.log("type");
        console.log(typeof(lctrs));
        // var testsList = JSON.stringify(items.locators).tests;

        console.log("111");

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id, {
                    code: `localStorage.setItem("locators", ${lctrs});`
                });
        });

        console.log("222");


        // chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        //     chrome.tabs.executeScript(
        //         tabs[0].id, {
        //             code: `localStorage.setItem("testsList", ${testsList});`
        //         });
        // });

        console.log("333");


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

function showPages() {
    console.log("444");

    chrome.storage.local.get(['locators'], function(result) {
        console.log("555");


        var json = JSON.parse(JSON.parse(result.locators));
        console.log(json);
        console.log(typeof(json));

        var pages = document.querySelectorAll('*[class*="pages"]');
        for (var index = 0; index < pages.length; index++) {
            pages[index].remove();
        }

        for (var i = 0; i < json.length; i++) {
            (function(e) {
                console.log("777" + i);
                div = document.createElement("div");
                div.classList.add("pages");
                a = document.createElement("a");
                a.role = "button";
                a.href = "#";
                div.style.border = "4px double black";
                div.style.padding = "10px";
                a.innerText = json[e].page + " pins: " + json[e].pins.length;

                console.log("888" + json[e].page);

                a.onclick = function () {
                    console.log("store " + json[e].page);

                    showData(json[e].page);
                };

                console.log("999");

                div.appendChild(a);
                document.body.appendChild(div);
            }(i))
        }

        console.log("666");

    });
}

showPages();

