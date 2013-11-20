function newdatatable(table_obj) {
	/* Data set - can contain whatever information you want */
	var rows = [
		['Trident','Internet Explorer 4.0','Win 95+','4','X'],
		['Trident','Internet Explorer 5.0','Win 95+','5','C'],
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
	$('#'+table_obj.table_id).dataTable( {
		"aaData": table_obj.rows,
		"aoColumns":table_obj.column_headers,
		"aaSorting":[[table_obj.sort_index, table_obj.sort_order]],
		"bDestroy":true,
		"iDisplayLength":table_obj.default_count
	});	
	$('#'+table_obj.table_id).css('width', '');
}
