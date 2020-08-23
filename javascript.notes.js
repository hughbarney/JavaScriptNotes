/*
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" />
  <title>Read File2</title>
  <link rel="stylesheet" type="text/css" href="simple_edit.css" />
  <script type="text/javascript" src="read2.js"></script> 
</head>

<body>
  <input type="file" id="file" name="file" onchange="readFile(event)"/>
  &nbsp
  <input type="button" id="save" name="Save" value="Save" onclick="onSave()"/>
  <br/>
  <textarea class="text_edit" id="id_edit_area"></textarea>
  <br/>
</body>
</html>
*/
     

function Car(model, cylinders, hp) {

    this.model = model;
    this.numCyl = cylinders;
    this.hp = hp;
}

// add a property to the class
Car.prototype.color = "red";

// add a new method to a class
Car.prototype.reportInfo = function() {

    // code here.

}

// now SUV is a subclass of Car. Inherits all Car proproties.
SUV.prototype = new Car();


    
/// get value from an element
    function getVal() {
	var x = document.getElementById("myButtonId").value;
	document.getElementById("value1").innerHTML = x;
    }


<input type="button" name="myButtonName" id="myButtonId" value="clickMe" onclick="getVal()"/>
<div id ="value1" >

	;;
