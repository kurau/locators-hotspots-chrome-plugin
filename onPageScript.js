var arr1 = JSON.parse(localStorage.getItem('locators'));

console.log(" * " + arr1.length);

function flash(arr) {
    for (let i in arr) {

        console.log(" * " + arr[i].path);
        let elem = document.evaluate(arr[i].path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue;
        if (elem == null) {
            continue;
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
        hoverElement.innerHTML = arr[i].testcount;
        hoverElement.style.position = "absolute";
        hoverElement.style.borderRadius = "4px";
        hoverElement.style.right = "0";
        hoverElement.style.bottom = "0";
        hoverElement.style.backgroundColor = "lightblue";

        elem.style.border = "thin dotted lightblue";
        elem.style.position = "relative";
        elem.style.border = arr[i].path;
        elem.appendChild(hoverElement);
    }
}


flash(arr1);

var observer = new MutationObserver(function(mutations) {
    for(let mutation of mutations) {
        for(let node of mutation.addedNodes) {
            if (!(node instanceof HTMLElement)) {
                continue;
            }
            if (node.matches(".test-coverage")) {
                continue;
            }
            flash(arr1);
        }
    }
});
observer.observe(document.body, {subtree: true, childList: true});

let tooltip;
document.onmouseover = function(event) {
    let target = event.target;

    let isTooltip = target.classList.contains("test-coverage");
    if (!isTooltip) {
        return;
    } else {
        console.log("tooltip");
    }

    tooltip = document.createElement('div');
    tooltip.classList.add("test-coverage");
    tooltip.style.backgroundColor = "aqua";
    tooltip.style.color = "green";
    tooltip.style.borderRadius = "4px";
    tooltip.style.position = "fixed";
    tooltip.padding = "10px 20px";
    tooltip.innerHTML = "test1, test2, test3 ...";

    let coords = target.getBoundingClientRect();
    let left = coords.right - 1;
    if (left < 0) left = 0;

    let top = coords.top - tooltip.offsetHeight - 5;
    if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';

    target.append(tooltip);
};

document.onmouseout = function(e) {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
};