$(document).ready(function() {

	var title = document.title;
	var url = window.location.href;

	function getSelectionText(part) {
		var text;

		if (typeof window.getSelection != 'undefined') {
			text = window.getSelection().toString();
			chrome.runtime.sendMessage({type: part, resource: text});
		} else if (typeof document.selection != 'undefined') {
			text = document.selection.createRange().htmlText;
			chrome.runtime.sendMessage({type: part, resource: text});
		}
	}

	var iframeSrc = chrome.extension.getURL('src/browser_action/browser_action.html');
	var extensionSrc = 'chrome-extension://' + chrome.runtime.id;

	function createPopup() {
	    popup = document.createElement('IFRAME');
	    popup.setAttribute('src', iframeSrc);
	    popup.setAttribute('id', 'recipe-ext');
	    popup.style.position = 'fixed';
	    popup.style.top = 10 + 'px';
	    popup.style.right = 10 + 'px';
	    popup.style.zIndex = 9999;
	    popup.style.height = '100%';
	    document.body.appendChild(popup);
	}

	chrome.runtime.onConnect.addListener(function(port) {
		console.assert(port.name == 'init extension');
		createPopup();
		port.postMessage({type: 'page title', resource: title});
	});

	window.addEventListener('message', function(e) {
		if (e.origin === extensionSrc) {
			switch(e.data) {
				case "created":
					chrome.runtime.sendMessage({type: 'popup created', resource: title});
					break;
				case "Clicked In Ingredients":
					getSelectionText('ingredients');
					chrome.runtime.sendMessage({type: 'testing second runtime message', resource: title});
					break;
				case "Clicked In Instructions":
					getSelectionText('instructions');
			}
		}
	});

});