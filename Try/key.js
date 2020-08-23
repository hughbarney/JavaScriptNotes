
var response = "";



function onKeyUp(event) {
    var char = event.which || event.keyCode;

    var s = String.fromCharCode(char);

    if (!event.shiftKey)
	s = s.toLowerCase();
    
    response += s
    setOutput(response);
}


function setOutput(str) {
    document.getElementById("output").innerHTML = str;
}


