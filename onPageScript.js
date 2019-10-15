var arr1 = JSON.parse(localStorage.getItem('locators'));

console.log(" * " + arr1.length);

function flash(arr) {

    var oldElements = document.getElementsByClassName("test-coverage");
    for (var i=0; i<oldElements.length; i++) {
        oldElements[i].remove();
    }

    for (let i in arr) {
        let elem;
        let elem1 = document.evaluate(arr[i].path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue;
        if (elem1 == null) {
            continue;
        }

        if(arr[i].path.includes("input")) {
            elem = elem1.parentNode
        } else {
            elem = elem1;
        }


        let hasHover = false;
        for (var ch of elem.children) {
            if (ch.matches(".test-coverage")) {
                hasHover = true;
            }
        }
        if (hasHover) {
            continue;
        }

        let hoverElement = document.createElement('div');
        hoverElement.classList.add("test-coverage");
        hoverElement.innerHTML = arr[i].count;
        var title = "";
        for (var j=0; j<arr[i].names.length; j++) {
            title = title + arr[i].names[j] + "\n";
        }
        hoverElement.setAttribute("title", title);
        hoverElement.style.position = "absolute";
        hoverElement.style.borderRadius = "4px";
        hoverElement.style.left = "0";
        hoverElement.style.top = "0";
        hoverElement.style.backgroundColor = "lightblue";

        hoverElement.style.zIndex = "1002";
        // hoverElement.style.top = elem.style.top;
        // hoverElement.style.left = elem.style.left;
        // hoverElement.style.right = elem.style.right;
        // hoverElement.style.height = elem.style.height;
        // hoverElement.style.width = elem.style.width;

        // elem.style.border = "thin solid lightblue";
        elem.style.position = "relative";
        elem.appendChild(hoverElement);
    }
}

flash(arr1);

const wrapAll = (target, wrapper = document.createElement('div')) => {
    ;[ ...target.childNodes ].forEach(child => wrapper.appendChild(child))
    target.appendChild(wrapper);
    return wrapper
};
const wrapper = wrapAll(document.body);
wrapper.style.width = "70%";
wrapper.style.cssFloat = "left";

document.body.appendChild(wrapper);

var bar = document.createElement("div");
bar.style.border = "thick solid red";
bar.style.width = "28%";
bar.style.cssFloat = "right";
bar.style.backgroundColor = "lightblue";
bar.style.zIndex = "1002";

var barText = "";
for (let i in arr1) {
    barText += arr1[i].path + "<br><br>";
}
bar.innerHTML = barText;

var button = document.createElement("input");
button.type = "button";
button.onclick = function(){
        flash(arr1);
    };

bar.appendChild(button);

document.body.appendChild(bar);
// ДИНАМИЧЕСКОЕ ОБНОВЛЕНИЕ
// var observer = new MutationObserver(function(mutations) {
//     for(let mutation of mutations) {
//         for(let node of mutation.addedNodes) {
//             if (!(node instanceof HTMLElement)) {
//                 continue;
//             }
//             if (node.matches(".test-coverage")) {
//                 continue;
//             }
//             flash(arr1);
//         }
//     }
// });
// observer.observe(document.body, {subtree: true, childList: true});

var tooltip;
document.onmouseover = function(event) {
    let target = event.target;

    let isTooltip = target.classList.contains("test-coverage");
    if (!isTooltip) {
        return;
    }

    tooltip = document.createElement('div');
    tooltip.classList.add("test-coverage");
    tooltip.style.backgroundColor = "aqua";
    tooltip.style.color = "green";
    tooltip.style.borderRadius = "4px";
    tooltip.style.position = "fixed";
    tooltip.style.zIndex = "1002";
    tooltip.padding = "10px 20px";
    tooltip.innerHTML = target.getAttribute("title");
    document.body.append(tooltip);

    let coords = target.getBoundingClientRect();
    let left = coords.left + (target.offsetWidth - tooltip.offsetWidth) / 2;
    if (left < 0) left = 0;

    let top = coords.top - tooltip.offsetHeight - 5;
    if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
};

document.onmouseout = function(e) {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
};

