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
	var data = $("#files").data('json');
	display(data);
	//alert("File");
}

function Lines($scope) {
	var data = $("#lines").data('json');
	display(data);
	//alert("Line");
}

function Authors($scope) {
	//alert("Author");
	var data = $("#author").data('json');
	display(data);
}

function Tags($scope) {
	var data = $("#tags").data('json');
	display(data);
	//alert("Tag");
}
function display(data) {
	var keys = Object.keys(data);
	for (i = 0; i<keys.length; i++) {
		if (data[keys[i]].type && data[keys[i]].type == 'table') {
			newdatatable(data[keys[i]]);
		} else if (data[keys[i]].type && data[keys[i]].type == 'table-dom') {
			domdatatable(data[keys[i]]);
		} else if (data[keys[i]].type && data[keys[i]].type == 'bar') {
			//alert(keys[i]+" "+JSON.stringify(data[keys[i]]));
			init_bar_graph(data[keys[i]]);
		} else if (data[keys[i]].type && data[keys[i]].type == 'donut') {
			init_pie_donut_chart(data[keys[i]]);
		} else if (data[keys[i]].type && data[keys[i]].type == 'pie') {
			init_pie_donut_chart(data[keys[i]]);
		}
	}
}

