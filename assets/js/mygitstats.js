var highlight_class = "background-sunFlower";
$(document).ready(function() {
});

function Index($scope) {
	//alert("Index");
	var imgCount = 6;
	$('#myCarousel').bind('slid',function(){
		imgCount--;
		if(imgCount === 0)
			$('#myCarousel').carousel('pause');
	});
	$("#myCarousel").carousel({
		interval:3500,
	});
	$(".main-nav").children(":eq(0)").addClass(highlight_class);
}

function Activity($scope) {
	//alert("Activity");
	var data = $("#activity").data('json');
	$(".main-nav").children(":eq(1)").addClass(highlight_class);
	display(data);
}

function Authors($scope) {
	//alert("Author");
	$scope.detail = " ";
	$scope.year_month = {};
	var data = $("#author").data('json');
	$(".main-nav").children(":eq(2)").addClass(highlight_class);
	display(data);
	$scope.showDetails = function ($event){
		var elem = $event.target;
		$scope.year_month = $(elem).data('details');
		$("#year-month-modal").modal();
	};
	$scope.hideDetails = function (){
		$scope.detail = " ";
	};
}

function Files($scope) {
	var data = $("#files").data('json');
	$(".main-nav").children(":eq(3)").addClass(highlight_class);
	display(data);
	//alert("File");
}

function Lines($scope) {
	var data = $("#lines").data('json');
	$(".main-nav").children(":eq(4)").addClass(highlight_class);
	display(data);
	//alert("Line");
}

function Tags($scope) {
	var data = $("#tags").data('json');
	display(data);
	$(".main-nav").children(":eq(5)").addClass(highlight_class);
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
		} else if (data[keys[i]].type && data[keys[i]].type == 'canvas') {
			draw_clock_canvas(data[keys[i]]);
		} else if (data[keys[i]].type && data[keys[i]].type == 'line') {
			init_line_graph(data[keys[i]]);
		} else if (data[keys[i]].type && data[keys[i]].type == 'donut') {
			init_pie_donut_chart(data[keys[i]]);
		} else if (data[keys[i]].type && data[keys[i]].type == 'lineseries') {
			for (var j = 0; j < data[keys[i]].author_arr.length; j++) {
				init_line_graph(data[keys[i]].author_arr[j]);
			}
		} else if (data[keys[i]].type && data[keys[i]].type == 'pie') {
			init_pie_donut_chart(data[keys[i]]);
		}
	}
}

function draw_clock_canvas(div_object) {
	//alert(JSON.stringify(div_object.data));
	var limit = div_object.upperlimit;
	var color_arr = get_random_colors(limit, 0);
	console.log(color_arr);
	var b_canvas = document.getElementById(div_object.divid);
	var w = b_canvas.width;
	var h = b_canvas.height;
	var ctx = b_canvas.getContext("2d");
	var iStrokeWidth = 2.5;
	var a = Math.PI/12;
	var max_r = w/3 + 10;
	var iTranslate = (iStrokeWidth % 2) / 2;
	var factor = 1.0;
	for (var i=0; i<limit; i++){
		r = div_object.data[i].factor * max_r;
		ctx.strokeStyle=color_arr[i];
		var angle = i * a - Math.PI/2 + a;
		var destx = w/2 + (r * Math.cos(angle));
		var desty = h/2 + (r * Math.sin(angle));
		ctx.translate(iTranslate, iTranslate);
		ctx.lineWidth = iStrokeWidth;
		ctx.beginPath();
		ctx.moveTo(w/2, h/2);
		ctx.lineTo(destx, desty);
		ctx.stroke();
		ctx.font = "9pt Arial";
		destx = w/2 + ((max_r +10) * Math.cos(angle));
		desty = h/2 + ((max_r +10)* Math.sin(angle));
		//temp = ((0 < i < 6) || (18 < i < 24))?4 : 0;
		ctx.fillText(div_object.data[i].value, destx - 7, desty);
		// reset the translation back to zero  
		ctx.translate(-iTranslate, -iTranslate);  
	}
}

function Test($scope) {
	var color_arr = get_random_colors(24, 0);
	var b_canvas = document.getElementById("test");
	var w = b_canvas.width;
	var h = b_canvas.height;
	var context = b_canvas.getContext("2d");
	var ctx = context;
	var iStrokeWidth = 3;
	var a = Math.PI/12;
	var max_r = w/3;
	var iTranslate = (iStrokeWidth % 2) / 2;
	for (var i=0; i<24; i++){
		//r = big_r - (i * 10);
		r = 1.0 * max_r;
		ctx.strokeStyle=color_arr[i];
		var destx = w/2 + (r * Math.cos(i*a));
		var desty = h/2 + (r * Math.sin(i*a));
		ctx.translate(iTranslate, iTranslate);
		ctx.lineWidth = iStrokeWidth;
		ctx.beginPath();
		ctx.moveTo(w/2, h/2);
		ctx.lineTo(destx, desty);
		ctx.stroke();
		// reset the translation back to zero  
		//ctx.rotate(angle);
		ctx.translate(-iTranslate, -iTranslate);  
	}
}
