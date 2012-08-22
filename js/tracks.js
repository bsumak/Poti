// Tracks
var tracks;
var tracksLoaded = false;
var selectedTrack;

// Map
var map;

// Load tracks from DB/webservice
function loadTracks() {
	
	// Don't load if already loaded (back navigation etc.)
	if(tracksLoaded) return;
	
	// From Webservice
	var URL = serviceURL + '/rs/get/tracks';
	
	// Show loader
	$.mobile.showPageLoadingMsg('b', 'Nalaganje...', true);
	
	$.getJSON(URL, function(data) {
		
		// Fill the tracks
		tracks = data.track;
		fillTracks();
		
		// Hide loader
		$.mobile.hidePageLoadingMsg();
		
	});
	
}

function fillTracks() {
	
	var listItem = '<li><a href="javascript:gotoDetail({0});"><h3 class="ui-li-heading">{1}</h3><span class="ui-li-desc">{2}</span></a></li>';
	var tracksObj = $('#tracks');
	var track;
	
	// Empty the list
	tracksObj.empty();
	
	// Add items
	for(i = 0; i < tracks.length; i++) {
		
		track = tracks[i];
		tracksObj.append(listItem.format(i, track.name, track.description));
		
	}
	
	// Refresh view
	tracksObj.listview("refresh");
	
	// Tracks are loaded
	tracksLoaded = true;
	
}

function showOverlays(locations) {
	
	// If only 1 element -> create an array
	if(!(locations instanceof Array)) {
		
		locations = [locations];
		
	}
	
	var pos, marker, content, location;
	for(var i = 0; i < locations.length; i++) {
		
		location = locations[i];
		pos = new google.maps.LatLng(location.latitude, location.longitude);
		
		marker = new google.maps.Marker({
			position: pos,
		    map: map
		});
		
		// Image ?
		if ("photoPath" in location) {
		
			contentString = '<div class="image_w_caption"><img src="{0}{1}" alt="{2}" title="{2}" /> <em>{2}</em></div>'.format(serviceURL, location.photoPath, location.description);
			
			google.maps.event.addListener(marker, 'click', function() {
				new google.maps.InfoWindow({ content: contentString }).open(map, this);
			});
			
			// Make Marker "special"
			marker.setAnimation(google.maps.Animation.BOUNCE);
			
		}
		
	}
	
}

function gotoDetail(index) {
	
	// Obtain track detail
	selectedTrack = tracks[index];
		
	// Change page
	$.mobile.changePage('#mapPage');
	
}

// All tracks
$('#tracksPage').live('pageshow', function(event) {

	// Load tracks
	loadTracks();
	
});

// All locations on a map
$('#mapPage').live('pageshow', function(event) {
	
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	// Get locations
	var id = selectedTrack.id;
	
	// From Webservice
	var URL = serviceURL + '/rs/get/track/' + id + '/locations';
	
	// Show loader
	$.mobile.showPageLoadingMsg('b', 'Nalaganje...', true);
	
	$.getJSON(URL, function(data) {
		
		// Fill the locations
		showOverlays(data.location);
		
		// Hide loader
		$.mobile.hidePageLoadingMsg();
		
	});
	
});
