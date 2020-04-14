var arrSplit = JSON.parse(localStorage.getItem('locators'));
var testList2 = JSON.parse(localStorage.getItem('testsList'));
var testMap2 = new Map(Object.entries(testList2));

var barText = "";
var barTests = "";

const wrapAll = (target, wrapper = document.createElement('div')) => {
    [...target.childNodes].forEach(child => wrapper.appendChild(child));
    target.appendChild(wrapper);
    return wrapper
};

function setBarTests() {
    barTests = "Всего тестов " + testMap2.size;
    return barText;
}

function setBarText() {
    var sum = 0;
    for (let i in arrSplit) {
        sum += arrSplit[i].pins.length;
    }
    barText = "Всего локаторов " + sum;
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

    var button = document.createElement("button");
    button.classList.add("refreshLocators");
    button.onclick = function () {
        hasNewNode = true;
        wroomwroom();
        var section1 = document.getElementById("section2");
        section1.innerHTML = barText;
    };
    button.innerText = "Обновить локаторы";
    bar.appendChild(button);

    bar.appendChild(barTabs());

    var row = document.createElement("div");
    row.classList.add("pageContainer");

    row.appendChild(bodyWrapper);
    row.appendChild(bar);
    document.body.appendChild(row);

    setBarText();
    var section1 = document.getElementById("section2");
    section1.innerHTML = barText;
    setBarTests();
    var section1 = document.getElementById("section1");
    section1.innerHTML = barTests;
}

splitAndShowInfo();
