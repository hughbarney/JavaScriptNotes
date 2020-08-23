
var keyMap = [
    { keyname: 'C-x C-s', name: 'save-file'         , func: save_file },
    { keyname: 'C-x C-c', name: 'exit'              , func: exit_editor },
    { keyname: 'C-a'    , name: 'beginning-of-line' , func: beginning_of_line },
    { keyname: 'C-e'    , name: 'end-of-line'       , func: end_of_line },
    { keyname: 'A-a'    , name: 'alt-a'             , func: alt_a }
    ];

var NOT_BOUND = { keyname: 'no_match', name: 'no-match', func: not_bound };
var SUB_MATCH = { keyname: 'sub_match', name: 'sub-match', func: not_bound };

function save_file() { alert("save-file") };
function exit_editor() { alert("exit-editor") };
function beginning_of_line() { alert("beginning-of-line") };
function end_of_line() { alert("end-of-line") };
function alt_a() { alert("alt-a") };
function insert_char(ch) { alert("insert-char: " + ch); };
function not_bound() { alert(this.keyname + " not bound"); };

var keyStash = "";

function onkey(event) {
    try {
	onkey_handler(event);
    } catch (e) {
	alert("onkey exception + " + e);
    }
}

function onkey_handler(event) {
    var char = event.which || event.keyCode;
    var s = String.fromCharCode(char);

    //alert("onkey_handler()");
    // do nothing if just a SHIFT or CTRL with nothing else
    switch (event.keyCode) {
	case 16:
	case 17:
	case 18:
	    //alert("Non actual Key:" + s + ":" + event.keyCode);
	    return;
	default:
	    break;
    }

    event.preventDefault();

    if (event.keyCode == '38') {
        // up arrow
	alert("UP");
    } else if (event.keyCode == '40') {
        // down arrow
	alert("DOWN");
    } else if (event.keyCode == '37') {
	// left arrow
	alert("LEFT");
    } else if (event.keyCode == '39') {
	// right arrow
	alert("RIGHT");
    } else if (event.keyCode == '46') {
	// delete
	alert("DEL");
    } else if (event.keyCode == '8') {
	// backspace
	alert("BACKSPACE");
    } else if (isCommandKey(event)) {
	var name = getKeyname(event);
	var ky;

	if (name !== '') {
	    if (keyStash == '')
		ky = matchKey(name);
	    else
		ky = matchKey(keyStash + ' ' + name);
       
	    if (ky == SUB_MATCH) {
		stashCommandKey(name);
	    } else {
		execKey(ky);
		resetStash();

	    }
	} else {
	    alert("UNKNOWN key");
	}
	
    } else if (isCharacterKeyPress(event)) {
	alert("isChar " + event.keyCode);
	resetStash();
    } else {
	resetStash();
	alert("something else = " + event);
    }
}

function resetStash() {
    keyStash = '';
    message(keyStash);
}

function stashCommandKey(k) {
    if (keyStash == '')
	keyStash = k;
    else 
	keyStash = keyStash + ' ' + k;   
    message(keyStash);
}

function message(m) {
    document.getElementById('msg').innerHTML = m;
}

function isCommandKey(event) {
    return (event.ctrlKey || event.altKey || event.metaKey);
}

function getKeyname(event) {
    if (!isCommandKey(event))
	return '';

    var prefix = getKeyPrefix(event);
    var ch = event.which || event.keyCode;
    var key_name = prefix + String.fromCharCode(ch).toLowerCase();

    return key_name;
}

function getKeyPrefix(event) {
    if (event.ctrlKey)
	return "C-";
    else if (event.altKey)
	return "A-";
    else if (event.metaKey)
	return "M-";
    else
	return "UNKNOWN-";
}

function isCharacterKeyPress(evt) {
    if (typeof evt.which == "undefined") {
        // This is IE, which only fires keypress events for printable keys
        return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
        // In other browsers except old versions of WebKit, evt.which is
        // only greater than zero if the keypress is a printable key.
        // We need to filter out backspace and ctrl/alt/meta key combinations
        return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
    }
    return false;
}

function matchKey(nm) {
    //alert("trying to match: " + nm);
    for (i in keyMap)
    {
	//alert("Try " + i + " " + nm + " = '" + keyMap[i].keyname + "' " + nm.length + " " +  keyMap[i].keyname.length)
	if (nm == keyMap[i].keyname)
	    return keyMap[i];
    }

    // look for subset match
    //alert("check for submatch");
    for (i in keyMap)
    {
	var sub = keyMap[i].keyname.substr(0, nm.length);

	//alert("nm=" + nm + " sub=" + sub);
	if (nm == sub)
	    return SUB_MATCH;
    }

    //alert("NOT_BOUND: " + nm);
    NOT_BOUND.keyname = nm;
    return NOT_BOUND;
}

function execKey(ky) {
    //alert("exec: " + ky.name);
    
    try {
	ky.func();
	message("");
    } catch (e) {
	alert("Exception in execKey() " + e);
    }
}
