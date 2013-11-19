$(document).ready(function() {
});

function Index($scope) {
	//alert("Index");
}

function Activity($scope) {
	//alert("Activity");
	var data = $("#activity").data('json');
	var keys = Object.keys(data);
	//alert(keys);
	for (i = 0; i<keys.length; i++) {
		//alert(JSON.stringify(data[keys[i]]));
	}
}

function Files($scope) {
	//alert("File");
}

function Lines($scope) {
	//alert("Line");
}

function Authors($scope) {
	//alert("Author");
}

function Tags($scope) {
	//alert("Tag");
}
