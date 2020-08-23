var response = "";
var reader = new FileReader();
var fileText = "";
var fileLines;
var curLine = 0;
var lastLine = 0;

window.onload = function() {
    var el = document.getElementById("textView");
    el.addEventListener("keydown", onKeyDown, false);
}
    
reader.onload = function (e) {
    fileText = e.target.result;
    fileLines = fileText.split('\n');
    //alert("load = " + fileLines);
    lastLine = max(0, fileLines.length - 1);
    curLine = 0;
    redraw();
};

function readFile(event){
    try {
	var files = event.target.files;

	if (files && files[0]) {
	    reader.readAsText(event.target.files[0]);
	} else {
	    alert("No file selected");
	    setCanvasText("");
	}
    } catch ( e ) {
	alert("Error: " + e.description );
    }
}

function redraw() {
    var region = fileLines.slice(curLine, min(lastLine, curLine + 20));
    setViewText(region);
}

function setViewText(lines) {
    //alert("setViewText:\n" + lines);

    var i;
    
    for (i = 1; i < 21; i++) {
	var line_id = "L" + i;
	if (typeof lines[i - 1] !== "undefined")	
	    document.getElementById(line_id).innerHTML = lines[i - 1];
	else
	    document.getElementById(line_id).innerHTML = "";
    } 

    setLineNumber();
}

function max(a,b) {
    return (a > b) ? a : b;
}

function min(a,b) {
    return (a > b) ? b : a;
}

function onKeyDown(event) {
    if (event.keyCode == '38') {
        // up arrow
	//alert("UP");
	curLine = max(0, curLine - 1);
	redraw();
    }
    else if (event.keyCode == '40') {
        // down arrow
	//alert("DOWN");
	curLine = min(lastLine, curLine + 1);
	redraw();      
    }
    else if (event.keyCode == '37') {
       // left arrow
    }
    else if (event.keyCode == '39') {
	// right arrow
	return;
    }
}

function setLineNumber() {
    var ln = curLine + " / " + lastLine;
    document.getElementById("lineno").innerHTML = ln;
}
