
function open_file() {
    //alert("open_file");
    //var text = FileHelper.readStringFromFileAtPath ( "mytext.txt" );

    var text = "a value";

    try {
        text = FileHelper.readStringFromFileAtPath("C:\Users\600699468\Documents\Working\JavaScript\simple_edit.js")        
    } catch ( e ) {
        alert("Error: " + e.description );
    }

    alert(text);    
}

function save_file() {
    alert("save_file");
}


function FileHelper()
{
    FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom)
    {
	var request = new XMLHttpRequest();
	request.open("GET", pathOfFileToReadFrom, false);
	request.send(null);
	var returnValue = request.responseText;

	return returnValue;
    }
}


