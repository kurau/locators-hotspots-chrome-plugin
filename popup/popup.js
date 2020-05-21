
document.getElementById('showLocators').onclick = function () {
    chrome.runtime.sendMessage({text: "showSource", type: SHOW_SOURCE},function(response) {
        // console.log(response.text);
    });
};

document.getElementById('save').onclick = function () {
    let source = document.getElementById('dataSource').value;

    chrome.runtime.sendMessage({text: "downloadSource", type: DOWNLOAD_SOURCE, data: source},function(response) {
        // console.log(response.text);
    });
};


