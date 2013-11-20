function jqPlotChart(div, renderer, data) {
	this.chartDiv = div;
	this.chartRenderer = renderer;
	this.chartData = data;
	this.chartOptions = {};
	this.drawChart  = function () {
		var plot1 =  $.jqplot(this.chartDiv, this.chartData, this.chartOptions);
	};
	this.setChartOptions  = function (key, value) {
		this.chartOptions[key] = value;
	};
	this.setChartLevel2Options  = function (key1, key2, value) {
		this.chartOptions[key1][key2] = value;
	};
	this.setChartLevel3Options  = function (key1, key2, key3, value) {
		this.chartOptions[key1][key2][key3] = value;
	};

	this.init = function() {
		this.chartOptions.seriesDefaults = { renderer:this.chartRenderer, trendline:{ show:false }, pointLabels: { show: true }, rendererOptions: { padding: 8, showDataLabels: true } };
		this.chartOptions.grid = {drawGridLines: true, gridLineColor: '#cccccc', background: '#fff',borderWidth: 0};
		/*
        drawGridLines: true,        // wether to draw lines across the grid or not.
        gridLineColor: '#cccccc'    // *Color of the grid lines.
        background: '#fffdf6',      // CSS color spec for background color of grid.
        borderColor: '#999999',     // CSS color spec for border around grid.
        borderWidth: 2.0,           // pixel width of border around grid.
        shadow: true,               // draw a shadow for grid.
        shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
        shadowOffset: 1.5,          // offset from the line of the shadow.
        shadowWidth: 3,             // width of the stroke for the shadow.
        shadowDepth: 3,             // Number of strokes to make when drawing shadow.
                                    // Each stroke offset by shadowOffset from the last.
        shadowAlpha: 0.07           // Opacity of the shadow
        renderer: $.jqplot.CanvasGridRenderer,  // renderer to use to draw the grid.
        rendererOptions: {}         // options to pass to the renderer.  Note, the default
                                    // CanvasGridRenderer takes no additional options.
		*/
	};
	this.init();
}

/*
 Pass a javascript object to this function with the following members
 object = {
	div_id: //Where the graph needs to appear
	horizontal:// true for horizontal graphs false for vertical graphs
	title://What is the title of the graph
	data://Json format data which is populated in data-json field in the DOM for that div 
	entity://json data field where entity is specified
	count://json data field where count is specified
	upperlimit://upperlimit to limit the data
	numberformat://format how axis values should appear like %d for decimal %.2f for two point floats etc
*/	
function init_bar_graph(div_object) {
	//alert(JSON.stringify(div_object));
	var obj = div_object.json_data;
	var upperlimit = div_object.upperlimit;
	var limit = 0;
	if (!obj) {
		limit = 0;
	} else {
		limit = (obj.length > upperlimit)?upperlimit:obj.length;
	}
	var x_entity, y_entity;
	var chart_values = {"xaxis": [], "yaxis":[]};
	for (var i = 0; i < limit; i++) {
		x_entity = obj[i][div_object.entity];
		/*
		 * if (module_hash[x_entity]) {
		 *x_entity = module_hash[x_entity];
		 * }
		 */
		y_entity = obj[i][div_object.count];
		if (div_object.numberformat == "%.2f") {
			y_entity = parseFloat(y_entity).toFixed(2);
		}
		if (div_object.horizontal) {
			chart_values.xaxis.unshift(x_entity);
			chart_values.yaxis.unshift(y_entity);
			//chart_values.xaxis.push(x_entity);
			//chart_values.yaxis.push(y_entity);
		} else {
			chart_values.xaxis.push(x_entity);
			chart_values.yaxis.push(y_entity);
		}
	}
	var color_arr = get_random_colors(master_color_array, limit);
	var chart_options = {div_id:div_object.div_id, horizontal:div_object.horizontal, xaxis_values:chart_values.xaxis, yaxis_values:chart_values.yaxis, graph_title:div_object.title, color_arr:color_arr, axesformat:div_object.numberformat, ylabel:div_object.ylabel};
	draw_bar_graph(chart_options);
}
function draw_bar_graph(values) {
	//alert(JSON.stringify(values));
	$("#"+values.div_id).html("");
	if (values.yaxis_values.length === 0) {
		var newdiv ="<h3 class=text-center>"+values.graph_title+"</h3><div class=topdivider2></div><h2 class=text-center>Data not available</h2>";
		$("#"+values.div_id).html(newdiv);
		return;
	}
	$.jqplot.config.enablePlugins = true;
	var general = new jqPlotChart(values.div_id, $.jqplot.BarRenderer, [values.yaxis_values]);
	var legend = { show:true, placement: 'outside', rendererOptions: { numberRows: 1, animate:{show:true}}, location:'s', marginTop: '7px' };
	var numpoints = 5;
	var max = Math.max.apply(Math, values.yaxis_values);
	var min = Math.min.apply(Math, values.yaxis_values);
	var range = max - min;
	var step = max/numpoints;
	/*
	if (values.axesformat == "%d") {
		step = parseInt(step, 10);
	} else if (values.axesformat == "%.2f") {
		step = parseFloat(step).toFixed(2);
	}
   */
	var min_y = 0;
	var max_y = step * (numpoints + 1);
	general.setChartOptions("title", values.graph_title);
	if (values.horizontal) {
		general.setChartOptions("axes", {yaxis: {renderer: $.jqplot.CategoryAxisRenderer, ticks: values.xaxis_values}});
		general.setChartLevel2Options("axes", "xaxis", {min:min_y, max:max_y, label:values.ylabel, labelRenderer: $.jqplot.CanvasAxisLabelRenderer, labelOptions:{fontSize:'14pt'}});
		general.setChartLevel3Options("seriesDefaults", "rendererOptions", "barDirection", "horizontal");
		general.setChartLevel3Options("seriesDefaults", "rendererOptions", "barMargin", 20);
	} else {
		general.setChartOptions("axes", {xaxis: {renderer: $.jqplot.CategoryAxisRenderer, ticks: values.xaxis_values, tickRenderer: $.jqplot.CanvasAxisTickRenderer, tickOptions:{textColor:"#0088cc", angle:-20, fontSize:'14pt'}}});
		general.setChartLevel2Options("axes", "yaxis", {min:min_y, max:max_y, label:values.ylabel, labelRenderer: $.jqplot.CanvasAxisLabelRenderer, labelOptions:{fontSize:'14pt'}});
		general.setChartLevel3Options("seriesDefaults", "rendererOptions", "barMargin", 30);
	}
	general.setChartOptions("highlighter", {show:false, sizeAdjust:7, showtooltip:true, tooltipAxes:'both'});
	general.setChartOptions("cursor", {show:false});
	general.setChartOptions("axesDefaults", { min: min_y, tickOptions: { formatString: values.axesformat}});
	general.setChartOptions("animate", !$.jqplot.use_excanvas);
	general.setChartOptions("seriesColors", values.color_arr);
	general.setChartLevel3Options("seriesDefaults", "rendererOptions", "varyBarColor", true);

	general.setChartLevel2Options("grid", "borderWidth", 1.0);
	general.setChartLevel2Options("grid", "gridLineColor", "#ccc");
	general.drawChart();
}

function draw_timeline_graph (hits, hotspots, title) {
	$("#chart2").html("");
	//var line2 = [['2004', 42], ['2005', 56], ['2008', 39], ['2010', 81]];
	//var line3 = [['2004', 0.04], ['2005', 0.65], ['2008', 0.23], ['2010', 1.20]];
	var legend = { show:true, placement: 'inside', xoffset: 12, yoffset: 12, rendererOptions: { numberRows: 2, animate:{show:true}}, location:'nw'};
	var max = Math.max.apply(Math, hits);
	var step = max/5;
	var plot2 = $.jqplot('chart2', [hits, hotspots], {
		title: title,
		animate:true,
		grid: {
			gridLineColor:"#eee"
		},
		axesDefaults: {
			labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
			labelOptions:{fontSize:'14pt'}
		},
		legend: legend,
		cursor:{
			show:false,
			zoom: true,
			looseZoom: true,
			showTooltip: false
		},
		seriesDefaults: {
			rendererOptions: {
				smooth: true
			}
		},
		series:[ 
			{
				// Change our line width and use a diamond shaped marker.
				lineWidth:2,
				markerOptions: { style:'diamond' },
				yaxis:'y2axis',
				label:'Hits'
			},
			{
				// Don't show a line, just show markers.  Make the markers 7 pixels with an 'x' style
				//showLine:false, 
				markerOptions: { size: 7, style:"y" },
				label:'Hotspots'
			}
		],
		axes: {
			xaxis: {
				renderer: $.jqplot.DateAxisRenderer,
				label: 'Timeline',
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				tickRenderer: $.jqplot.CanvasAxisTickRenderer,
				tickOptions: {
					//labelPosition: 'middle',
					formatString:'%Y',
					angle: 15
				},
				min:'2004',
				tickInterval:'1 year'
			},
			yaxis: {
				label: 'HotSpots',
				min:0,
				//tickOptions : {formatString:"%.2f"},
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer
			},
			y2axis: {
				label: 'Hits',
				min:0,
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer
			}
		}
	});

}
