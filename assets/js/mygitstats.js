$(document).ready(function() {
});

function Index($scope) {
	//alert("Index");
}

function Activity($scope) {
	//alert("Activity");
	var data = $("#activity").data('json');
	display(data);
}

function Files($scope) {
	//alert("File");
}

function Lines($scope) {
	//alert("Line");
}

function Authors($scope) {
	alert("Author");
	var data = $("#author").data('json');
	display(data);
}

function Tags($scope) {
	//alert("Tag");
}
function display(data) {
	var keys = Object.keys(data);
	for (i = 0; i<keys.length; i++) {
		//alert(keys[i]+" "+JSON.stringify(data[keys[i]]));
	}
}
