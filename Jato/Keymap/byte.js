
var keymap = [
    { keys: 'C-a'     , name: 'beginning-of-line' },
    { keys: 'C-x C-s' , name: 'save-file' },
    { keys: 'C-x C-c' , name: 'exit' } 
    ];

function body_onload() {
    var i = 0;
    //alert("body.onload()");
}

function onkey(event) {
    try {
	onkey_handler(event);
    } catch (e) {
	alert("onkey exception + " + e);
    }
}

function onkey_handler(event) {
    alert("onkey()");

    var key_stash = 'C-x C-s';
    var i;

    for (i in keymap) {
	if (key_stash == keymap[i].keys) {
	    alert("matched: " + keymap[i].name);
	    return;
	}
    }

    alert("nothing matched");
}

