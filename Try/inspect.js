
var object = document;
var click_count = 0;

function inspect(the_id)
{
    var count = 0;

    var el = document.getElementById(the_id);
    alert("1: " + el.id.toString());
    //alert(the_id);

    var body = document.getElementById("body");

    alert("2:body " + body);
    
    click_count++;

    if (el.id != "top_window") {
	object = object[el.id.toString()];
    }

    alert(object);
    document.open();
    write_header(click_count);
    body_start(click_count);
    
    for (var p in object) {
	write_button(p);
	count++;
    }

    //alert(count);
    body_end();
    document.close();

    return false;
}

function write_header(n)
{
    document.write("<html>");
    document.write("<head>");
    document.write("<title>Inspector " + n + "</title>");
    document.write("<script type=\"text/javascript\" src=\"inspect.js\"></script>");
    document.write("</head>\n");
}

function body_start(n)
{
    document.write("<body>\n");
    document.write("<h1>Inspector " + n + "</h1>\n");
}

function body_end()
{
    document.write("\n\nDONE\n\n</body>\n</html>\n");
}

function write_button(obj) {
    document.write("  <input type=\"button\" id=\""  + obj.toString() + "\""  + "  value=\"" + obj.toString() + "\" onclick=\"inspect(this.id)\"/>\n");
    document.write("  <br\>\n");
}

