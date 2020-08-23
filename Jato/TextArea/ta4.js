var sz = 'ruskie';
var max_col = 6;
var min_col = 1;
var cur_col = 1;
var cur_point = 0;
var key_count = 0;
var the_key = "";

function onKeyPress(event) {
    // alert("onkeyPress");

    key_count++;
    
    var char = event.which || event.keyCode;
    var s = String.fromCharCode(char);

    // do nothing if just a SHIFT or CTRL with nothing else
    // this could be a horrible hack that causes problems later.
    switch (event.keyCode) {
	case 16:
	case 17:
	case 18:
	    //alert("Non actual Key:" + s + ":" + event.keyCode);
	    return;
	default:
	    break;
    }

    if (event.keyCode == '38') {
        // up arrow
	alert("UP");
    }
    else if (event.keyCode == '40') {
        // down arrow
	alert("DOWN");
    }
    else if (event.keyCode == '37') {
	// left arrow
	prev_input();
	event.preventDefault();
	display();
	//alert("LEFT");
    }
    else if (event.keyCode == '39') {
	// right arrow
	next_input();
	event.preventDefault();
	display();
	//alert("RIGHT");
	return;
    }
    
    else if (event.keyCode == '46') {
	// delete
	event.preventDefault();
	delete_char();
	display();
    }
    else if (event.keyCode == '8') {
	// backspace
	event.preventDefault();
	backspace();
	display();
    } else if (isCharacterKeyPress(event)) {
	//alert("isChar");
	event.preventDefault();
	insert_key(event);
	display();
    }
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

function insert_key(evt) {

    var char = evt.which || evt.keyCode;
    var s = String.fromCharCode(char);

    if (!evt.shiftKey)
	s = s.toLowerCase();


    
    the_key = s;
    cur_point = cur_col - 1;
    //alert("s=" + s);
    
    var first_part = sz.slice(0, cur_point);
    //alert("first=" + first_part);
    
    var last_part = sz.slice(cur_point, sz.length);
    //alert("e=" + e);

    //alert("first:" + first_part + " new: " + s + " last:" + last_part);
    
    sz = first_part + s + last_part;
    //alert("sz=" + sz);

    next_input();
}

function backspace() {
    prev_input();
    delete_char();
}

//[0][1][X][3][4]
// lesson learned calling a function delete() screws javascript
function delete_char() {
    cur_point = cur_col - 1;

    var d = sz[cur_point];
    //alert("del=" + d);
    
    var first_part = sz.slice(0, cur_point);
    //alert("f=" + f);
    
    var last_part = sz.slice(cur_point + 1, sz.length);
    //alert("e=" + e);

    sz = first_part + last_part;
    //alert("sz=" + sz);
}

function prev_input() {
    cur_col--;
    if (cur_col < min_col) cur_col = max_col;
    return cur_col + "";
}

function next_input() {
    cur_col++;
    if (cur_col > max_col) cur_col = min_col;
    return cur_col + "";
}

/*
  function display() {
  alert("display");
  }
*/

function display() {
    //alert("display");
    var id = cur_col + "";
    var i;
    
    for (i = 1; i <= max_col; i++) {
	setChar(i, sz[i-1]);
    }

    update_modeline();
    
    //display the cursor
    document.getElementById(id).setSelectionRange(0,0);
    document.getElementById(id).focus();
}

function setChar(n,c) {
    //alert("setChar");
    try {
	var el = document.getElementById(n + "");

	if (typeof c !== "undefined")
	    el.value = c;
	else
	    el.value = '';
	    
    } catch (e) {
	alert("failed to set element with id = " + n);
    }
}

function update_modeline() {
    //alert("modeline");
    var el = document.getElementById("mode_line");
    el.innerHTML = "col:" + cur_col + " key count:" + key_count + " key:" + the_key;
    key_count = 0;
}

