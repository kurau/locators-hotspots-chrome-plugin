var arr1 = JSON.parse(localStorage.getItem('locators'));

var barText = "";
var barTests = "";
var indent = 1;

const wrapAll = (target, wrapper = document.createElement('div')) => {
    [...target.childNodes].forEach(child => wrapper.appendChild(child));
    target.appendChild(wrapper);
    return wrapper
};

function setBarText(arr) {
    for (let i in arr) {
        barText = barText + Array(indent).join('--') + arr[i].fullPath + "<br>";
        if((arr.length - 1) === Number(i)) {
            indent--;
        }
        barText = barText + '<br/>'
    }
    return barText;
}

function setBarTests(arr) {
    for (let i in arr) {
        if (arr[i].fullPath !== null) {
            for (let k in arr[i].urls) {
                barTests = barTests + Array(indent).join('--') + arr[i].urls[k] + "<br>";
            }
        }
        if((arr.length - 1) === Number(i)) {
            indent--;
        }
        barTests = barTests + '<br/>'
    }
    return barText;
}

function barTabs() {
    var info = document.createElement("div");
    info.id = "coverageInfoBar";

    info.innerHTML =
        '<div class="coverageInfoBar">' +
            '<input id="tab1" type="radio" name="tabs" checked>' +
            '<label for="tab1" title="locators">Locators</label>' +
            '<input id="tab2" type="radio" name="tabs">' +
            '<label for="tab2" title="tests">Tests</label>' +
            '<section id="section1"></section>' +
            '<section id="section2"></section>' +
        '</div>';
    return info;
}

function splitAndShowInfo() {
    const bodyWrapper = wrapAll(document.body);
    bodyWrapper.classList.add("bodyWrapper")

    var bar = document.createElement("div");
    bar.classList.add("infoBar");
    setBarText(arr1);

    var button = document.createElement("input");
    button.type = "button";
    button.onclick = function () {
        showElements(arr1);
        var section1 = document.getElementById("section1");
        section1.innerHTML = barText;
    };
    bar.appendChild(button);

    bar.appendChild(barTabs());

    var row = document.createElement("div");
    row.classList.add("pageContainer");

    row.appendChild(bodyWrapper);
    row.appendChild(bar);
    document.body.appendChild(row);

    var section1 = document.getElementById("section1");
    section1.innerHTML = barText;
    setBarTests(arr1);
    var section1 = document.getElementById("section2");
    section1.innerHTML = barTests;
}

splitAndShowInfo();
