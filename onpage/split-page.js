console.log("-----");
console.log(typeof(localStorage.getItem('locators')));
var arr1 = localStorage.getItem('locators');
console.log(arr1.page);
var testList = localStorage.getItem('testsList');

var barText = "";
var barTests = "";
var indent = 1;

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
    locators.pins.forEach(pin => {
        if (pin.fullPath !== null) {
            tests += getTestItems(locator)
        }
    });
    tests += "</ul>";
    return tests;
}

function setBarTests(arr) {
    barTests = getTestsFromLocators(arr);
    return barText;
}

function setBarText(arr) {
    for (let i in arr) {
        barText = barText + Array(indent).join('--') + arr[i].fullPath + "<br>";
        if ((arr.length - 1) === Number(i)) {
            indent--;
        }
        barText = barText + '<br/>'
    }
    return barText;
}

function barTabs() {
    var info = document.createElement("div");
    info.id = "coverageInfoBar";

    info.innerHTML =
        '<div class="coverageInfoBar">' +
        '<input id="tab1" type="radio" name="tabs" checked>' +
        '<label for="tab1" title="tests">Tests</label>' +
        '<input id="tab2" type="radio" name="tabs">' +
        '<label for="tab2" title="locators">Locators</label>' +
        '<section id="section1"></section>' +
        '<section id="section2"></section>' +
        '</div>';
    return info;
}

function splitAndShowInfo() {
    const bodyWrapper = wrapAll(document.body);
    bodyWrapper.classList.add("bodyWrapper");
    bodyWrapper.id = "bodyWrapper";

    var bar = document.createElement("div");
    bar.classList.add("infoBar");
    setBarText(arr1);

    var button = document.createElement("input");
    button.type = "button";
    button.onclick = function () {
        wroomwroom();
        var section1 = document.getElementById("section2");
        section1.innerHTML = barText;
    };
    bar.appendChild(button);

    bar.appendChild(barTabs());

    var row = document.createElement("div");
    row.classList.add("pageContainer");

    row.appendChild(bodyWrapper);
    row.appendChild(bar);
    document.body.appendChild(row);

    var section1 = document.getElementById("section2");
    section1.innerHTML = barText;
    setBarTests(arr1);
    var section1 = document.getElementById("section1");
    section1.innerHTML = barTests;
}

splitAndShowInfo();
