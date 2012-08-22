// Cross-domain AJAX calls in WP7
$.support.cors = true;

// Config
var serviceURL = 'http://ales-pc.informatika.uni-mb.si:8080/PoletnaSola2011';

// Google maps
var mapOptions = {
	center: new google.maps.LatLng(46.5500, 15.6500),
	zoom: 13,
	zoomControl: true,
	zoomControlOptions: {
		position: google.maps.ControlPosition.RIGHT_TOP,
		style: google.maps.ZoomControlStyle.SMALL
	},
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Get URL vars
function getUrlVar(key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
	return result && unescape(result[1]) || "";
}

// Go back
function goBack() {
	history.back();
	return false;
}

// String formatting
String.prototype.format = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

// Dump
function mydump(arr,level) {
    var dumped_text = "";
    if(!level) level = 0;

    var level_padding = "";
    for(var j=0;j<level+1;j++) level_padding += "    ";

    if(typeof(arr) == 'object') {  
        for(var item in arr) {
            var value = arr[item];

            if(typeof(value) == 'object') { 
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += mydump(value,level+1);
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
            }
        }
    } else { 
        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
    }
    return dumped_text;
}

