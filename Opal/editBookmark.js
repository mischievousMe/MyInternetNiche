// This callback function is called when the content script has been 
// injected and returned its results

var url = ""
var waitTime = 3000
// Global reference to the status display SPAN
var statusDisplay = null;

function onPageDetailsReceived(pageDetails)  { 
    url = pageDetails.url;  
}

function removeCurBookmark() {

	if(url == "") {
		statusDisplay.innerHTML = 'Error: No URL!';
		console.log("early return")
		return
	}
	var key = localStorage.getItem(url)
	if(key == null) {
		return
	}
	localStorage.removeItem(url)
	console.log("okay")
	var key1 = key + "x1"
	var key2 = key + "x2"
	var key3 = key + "x3"
	var key4 = key + "x4"
	localStorage.removeItem(key1)
	localStorage.removeItem(key2)
	localStorage.removeItem(key3)
	localStorage.removeItem(key4)
	console.log("yay done!")
	statusDisplay.innerHTML = 'Removed!';
	window.setTimeout(function() {
		window.location.href = "popup.html"
	}, waitTime);
}

window.addEventListener('load', function(evt) {
	// Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');

	// Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
	document.getElementById('remove').addEventListener('click', removeCurBookmark);
});