
var response = "";
var reader = new FileReader();
var fileText = "";
var fileLines;
var curLine = 0;
var lastLine = 0;

window.onload = function() {
    var canvas = document.getElementById('myCanvas');
    canvas.addEventListener('keydown', onKeyCanvas(event));
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

/*
function setCanvasText(txt) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.font = '20px serif';

    var lines = txt.split('\n');
    var ind;
    var y = 20;

    // clear it first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (ind in lines) {
	ctx.fillText(lines[ind], 0, y);
	y += 20;
    }
}
*/

function redraw() {
    //alert("redraw: fileLines:\n" + fileLines);

    //alert("curLine = " + curLine + " lastLine " + lastLine);
    //alert("regionLast = " + min(lastLine, curLine + 20));
    
    var region = fileLines.slice(curLine, min(lastLine, curLine + 20));
    //alert("redraw: region\n" + region);
    setCanvasText(region);
}

function setCanvasText(lines) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.font = '20px serif';

    var ind;
    var y = 20;

    //alert("setCanvasText:\n" + lines);
    
    // clear it first
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (ind in lines) {
	ctx.fillText(lines[ind], 0, y);
	y += 20;
    }
    setLineNumber();
}

function max(a,b) {
    return (a > b) ? a : b;
}

function min(a,b) {
    return (a > b) ? b : a;
}

function onKeyCanvas(event) {
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

    //appendKey(event);
}

function appendKey(event) {

    var char = event.which || event.keyCode;
    var s = String.fromCharCode(char);
    //alert("onKeyCanvas " + s);

    if (!event.shiftKey)
	s = s.toLowerCase();

    fileText += s;
    //setCanvasText(fileText);
}

function onKeyUp(event) {
    var char = event.which || event.keyCode;

    var s = String.fromCharCode(char);

    if (!event.shiftKey)
	s = s.toLowerCase();
    
    response += s
    setOutput(response);
}

function setLineNumber() {
    var ln = curLine + " / " + lastLine;
    document.getElementById("lineno").innerHTML = ln;
}
