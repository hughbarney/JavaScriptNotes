// https://stackoverflow.com/questions/371875/local-file-access-with-javascript

var reader = new FileReader();

reader.onload = function (e) {
    var output = e.target.result;
    //alert(output);
    setBuffer(output);
};

function onSave() {
    alert("Save Button");
}

function readFile(event){
    try {
	var files = event.target.files;

	if (files && files[0]) {
	    reader.readAsText(event.target.files[0]);
	} else {
	    alert("No file selected");
	    setBuffer("");
	}
    } catch ( e ) {
	alert("Error: " + e.description );
    }
}

function setBuffer(txt) {
    var textArea = document.getElementById('id_edit_area');
    textArea.value = txt;
}
