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
		//alert(keys[i]+" "+JSON.stringify(data[keys[i]]));
		if (data[keys[i]].type && data[keys[i]].type == 'table')
			newdatatable(data[keys[i]]);
	}
}

function newdatatable(table_obj) {
	/* Data set - can contain whatever information you want */
	var rows = [
		['Misc','NetFront 3.1','Embedded devices','-','C'],
		['Other browsers','All others','-','-','U']
	];
	var column_headers = [
			{ "sTitle": "Engine" },
			{ "sTitle": "Browser" },
			{ "sTitle": "Platform" },
			{ "sTitle": "Version", "sClass": "center" },
			{ "sTitle": "Grade", "sClass": "center" }
		];
	if (table_obj.rows.length === 0)
		return;
	$('#'+table_obj.divid).dataTable( {
		"aaData": table_obj.rows,
		"aoColumns":table_obj.column_headers,
		"aaSorting":[[table_obj.sort_index, table_obj.sort_order]],
		"bDestroy":true,
		"iDisplayLength":table_obj.show_count
	});	
	$('#'+table_obj.divid).css('width', '');
}
