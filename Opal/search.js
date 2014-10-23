window.addEventListener('load', function(evt) {
	if(localStorage.getItem('markCount') == null) {
        localStorage.setItem('markCount','0');
    }
    var count = + localStorage.getItem('markCount');

    var titles = []
    var urls = []
    var summarys = []
    var tagsx = []

    for(var i = 1;i <= count;i = i + 1) {
    	
    	var title = localStorage.getItem(''+i+'x1',title);
    	var url = localStorage.getItem(''+i+'x2',url);
    	var summary = localStorage.getItem(''+i+'x3',summary);
    	var tags = localStorage.getItem(''+i+'x4',tags);

    	var tabBody=document.getElementsByTagName("tbody").item(0);
        var row=document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");

        textnode1=document.createTextNode(title);
        textnode2=document.createTextNode(url);
        textnode3=document.createTextNode(summary);
        textnode4=document.createTextNode(tags);

        cell1.appendChild(textnode1);
        cell2.appendChild(textnode2);
        cell3.appendChild(textnode3);
        cell4.appendChild(textnode4);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);

        tabBody.appendChild(row);

    	titles.push(title);
    	urls.push(url);
    	summarys.push(summary);
    	tagsx.push(tags);
    } 
});