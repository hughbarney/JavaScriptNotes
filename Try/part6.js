var inputs = 0;

function addContact(){
    var table = document.getElementById('contacts');

    var tr    = document.createElement('TR');
    var td1   = document.createElement('TD');
    var td2   = document.createElement('TD');
    var td3   = document.createElement('TD');
    var inp1  = document.createElement('INPUT');
    var inp2  = document.createElement('INPUT');

    inputs++;

    if(inputs>0){
	var img     = document.createElement('IMG');
	img.setAttribute('src', 'delete.gif');
	img.onclick = function(){
	    removeContact(tr);
	}
	td1.appendChild(img);
    }

    inp1.setAttribute("Name", "Name" +inputs);
    inp2.setAttribute("Name", "Email"+inputs);

    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    td2.appendChild(inp1);
    td3.appendChild(inp2);

}

function removeContact(tr){
    tr.parentNode.removeChild(tr);
}
