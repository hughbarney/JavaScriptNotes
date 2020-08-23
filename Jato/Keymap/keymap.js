function body_onload() {
    var i = 0;
    //alert("body.onload()");
}

var keyMap = [
    { bytes: '1' keyname: 'C-a', func: ctrl_a },
    { keyname: 'C-b', func: ctrl_b },
    { keyname: 'C-c', func: ctrl_c },
    { keyname: 'C-d', func: ctrl_d },
    { keyname: 'C-e', func: ctrl_e },
    { keyname: 'C-f', func: ctrl_f },
    { keyname: 'C-g', func: ctrl_g },
    { keyname: 'C-h', func: ctrl_h },
    { bytes: '24' keyname: 'C-x y', func: ctrl_i },
    { keyname: 'A-a', func: alt_a },
    { keyname: 'A-b', func: alt_b },
    { keyname: 'A-c', func: alt_c }
    ];

function ctrl_a() { alert("ctrl_a()") };
function ctrl_b() { alert("ctrl_b()") };
function ctrl_c() { alert("ctrl_c()") };
function ctrl_d() { alert("ctrl_d()") };
function ctrl_e() { alert("ctrl_e()") };
function ctrl_f() { alert("ctrl_f()") };
function ctrl_g() { alert("ctrl_g()") };
function ctrl_h() { alert("ctrl_h()") };
function ctrl_i() { alert("ctrl_i()") };
function alt_a() { alert("alt_a()") };
function alt_b() { alert("alt_b()") };
function alt_c() { alert("alt_c()") };

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
	//alert(name);
	matchKey(event);
    } else if (isCharacterKeyPress(event)) {
	alert("isChar " + event.keyCode);
    } else {
	alert("something else = " + event);
    }
}

    /*
function isCtrlKey(event) {
    return (event.ctrlKey && event.keyCode >= 65 && event.keyCode <= 90);
}

function isMetaKey(event) {
    return event.metaKey;
}

function isAltKey(event) {
    return event.altKey;
}
    */

function isCommandKey(event) {
    return (event.ctrlKey || event.altKey || event.metaKey);
}

function getKeyname(event) {
    if (!isCommandKey(event))
	return "NOT A COMMAND KEY";

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

function matchKey(event) {
    var nm = getKeyname(event);

    for (i in keyMap) {
	if (nm == keyMap[i].keyname) {
	    try {
		//alert("EXEC " + keyMap[i].keyname);
		//window[keyMap[i].func]();
		keyMap[i].func();
	    } catch (e) {
		alert("Exception in matchKey() " + e);
	    }
	}
    }
}
