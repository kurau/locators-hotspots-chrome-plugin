const wrapAll = (target, wrapper = document.createElement('div')) => {
    [...target.childNodes].forEach(child => wrapper.appendChild(child));
    target.appendChild(wrapper);
    return wrapper
};

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

function getTestsFromLocators(locators) {
    let tests = "<ul class='test-list'>";
    locators.forEach(locator => {
        if (locator.fullPath !== null) {
            tests += getTestItems(locator)
        }
    });
    tests += "</ul>";
    return tests;
}

function barTabs() {
    var info = document.createElement("div");
    info.id = "coverageInfoBar";

    info.innerHTML =
        '<div class="coverageInfoBar">' +
        '<input id="tab1" type="radio" name="tabs" checked>' +
        '<label for="tab1" title="tests">Tests</label>' +
        '<section id="section1"></section>'
        '</div>';
    return info;
}

function splitAndShowInfo(dataSource) {
    const bodyWrapper = wrapAll(document.body);
    bodyWrapper.id = "bodyWrapper";

    var bar = document.createElement("div");
    bar.classList.add("infoBar");

    // Refresh
    let refreshB = document.createElement("button");
    refreshB.onclick = function () {showElements(dataSource);};
    refreshB.innerHTML = "Обновить локаторы";
    bar.appendChild(refreshB);

    // Observer
    let stopObserver = document.createElement("button");
    stopObserver.classList.add("stopObserver");
    stopObserver.onclick = function () {observerStop();};
    stopObserver.innerText = "Stop Observer";
    bar.appendChild(stopObserver);

    let startObserver = document.createElement("button");
    startObserver.classList.add("startObserver");
    startObserver.onclick = function () {observerStart();};
    startObserver.innerText = "Start Observer";
    bar.appendChild(startObserver);

    // Tabs
    bar.appendChild(barTabs());

    var row = document.createElement("div");
    row.classList.add("pageContainer");

    row.appendChild(bodyWrapper);
    row.appendChild(bar);
    document.body.appendChild(row);

    var section1 = document.getElementById("section1");
    section1.innerHTML = getTestsFromLocators(dataSource);
}
