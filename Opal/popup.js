// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('title').value = pageDetails.title; 
    document.getElementById('url').value = pageDetails.url; 
    document.getElementById('summary').innerText = pageDetails.summary; 
    if(localStorage.getItem(pageDetails.url)) {
        console.log("hi");
        window.location.href = "removeBookmark.html"
    }
    else {
        console.log(pageDetails.url)
        console.log(localStorage.getItem(pageDetails.url))
    }
} 

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function addBookmark() {
    // Cancel the form submit
    event.preventDefault();
    statusDisplay.innerHTML = 'Saving...';
    var count = + localStorage.getItem('markCount');
    count = count + 1;
    localStorage.setItem('markCount','' + count);
    console.log(localStorage.getItem('markCount'));
    // Prepare the data to be POSTed by URLEncoding each field's contents
    var title = (document.getElementById('title').value);
    var url = (document.getElementById('url').value);
    var summary = (document.getElementById('summary').value);
    var tags = (document.getElementById('tags').value);

    localStorage.setItem(''+count+'x1',title);
    localStorage.setItem(''+count+'x2',url);
    localStorage.setItem(''+count+'x3',summary);
    localStorage.setItem(''+count+'x4',tags);
    localStorage.setItem(url,''+count);

    console.log(localStorage.getItem(''+count+'x1'));
    console.log(localStorage.getItem(''+count+'x2'));
    console.log(localStorage.getItem(''+count+'x3'));
    console.log(localStorage.getItem(''+count+'x4'));
    
    statusDisplay.innerHTML = 'Saved!';
}

function fetchLocalHost() {
        //event.preventDefault();
        //chrome.tabs.create({url:"http://localhost/"});
        //window.location = "http://localhost/";
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    if(localStorage.getItem('markCount') == null) {
        localStorage.setItem('markCount','0');
    }
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark').addEventListener('submit', addBookmark);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
    document.getElementById('fetch').addEventListener('click', fetchLocalHost);
});
