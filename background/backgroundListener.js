"use strict";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // Сейчас не совсем актуально
        // Будет нужно когда в попапе будет несколько ресурсов
        if (request.type === DOWNLOAD_SOURCE) {
            downloadDataAction(request.data);
            sendResponse({text: "ok"});
        }

        if (request.type === SHOW_SOURCE) {
            showPinsAction();
            sendResponse({text: "o7"});
        }

        // Сейчас не используется
        // Идея при наведении на пин ходить в backround, где хранятся все данные.
        // if (request.type === SHOW_PIN_INFO) {
        //     pinInfoAction(request.data);
        //     sendResponse({text: "ok"});
        // }

    });
