var color = 0;

document.onmousemove = function(event){
	// var x = event["x"];
	// var y = event["y"];
	var x = event.x;
	var y = event.y;
	//console.log(x , y);

	var div = document.createElement("div");
	div.style.left = x + "px";
	div.style.top = y + "px";
	div.style.backgroundColor = "hsl("+ color +", 50%, 80%)";
	document.body.appendChild(div);


	color = color + 1;
 


}