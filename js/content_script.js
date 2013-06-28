// Sending a request from a content script
/*
chrome.extension.sendMessage({msg: "I'm content-script"}, function (response) {
    console.log(response);
});
*/


// Receiving message from a background page
/*
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting === "Do you hear me?") {
            sendResponse({answer: "Yes"});
        }
    }
);
*/