function sndMsg() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.connect(tabs[0].id, {name: 'init extension'});
        console.log('init extension message sent');
    });
}

chrome.browserAction.onClicked.addListener(sndMsg);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "popup created":
            console.log(request.resource);
            chrome.tabs.query({active: true}, function(tabs) {
                for (var i=0; i<tabs.length; ++i) {
                    chrome.tabs.sendMessage(tabs[i].id, {type: 'page title', resource: request.resource});
                    console.log('message sent');
                }
            });
            break;
        case "ingredients":
            // console.log(request.resource);
            // getIngredients(request.resource);
            // console.log(getIngredients(request.resource));
            chrome.tabs.query({active: true}, function(tabs) {
                for (var i=0; i<tabs.length; ++i) {
                    chrome.tabs.sendMessage(tabs[i].id, {type: 'ingredients', resource: getIngredients(request.resource)});
                    console.log('ingrendients sent');
                }
            });
            break;
        case "instructions":
            chrome.tabs.query({active: true}, function(tabs) {
                for (var i=0; i<tabs.length; ++i) {
                    chrome.tabs.sendMessage(tabs[i].id, {type: 'instructions', resource: getInstructions(request.resource)});
                    console.log('instructions sent');
                }
            });
            break;
    }
});

function getIngredients(resource) {
    var newLineRegEx = /(\r\n|\n|\r)/g;
    return resource.split(newLineRegEx).filter(function(current) {
        return !newLineRegEx.test(current);
    }).filter(function(current) {
        return current !== '';
    });
}

function getInstructions(resource) {
    var newLineRegEx = /(\r\n|\n|\r)/g;
    return resource.split(newLineRegEx).filter(function(current) {
        return !newLineRegEx.test(current);
    }).filter(function(current) {
        return current !== '';
    });
}