var map;
var currentPosition;

// For recording distance
var positions = [];

var onSuccess = function(position) {
	
	var pos = getPosition(position);
    
    var mark = new google.maps.Marker({
                                      position: pos,
                                      map: map
                                      });
    
    positions.push ({
                    "latitude":position.coords.latitude,
                    "longitude":position.coords.longitude
                    });
    
    //alert("New locations recorded");
};

function getPosition(position) {
    
    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	if(!currentPosition) {
		currentPosition = new google.maps.Marker({
                                                 position: pos,
                                                 map: map
                                                 });
		
	} else {
		
		currentPosition.setPosition(pos);
		
	}
	
	map.panTo(pos);
    
    return pos;
}

function endTrack() {
    $.mobile.changePage("#trackDescription");
}

function saveTrack() {
	
	var inputTrackName,	inputTrackDescription, track, successCallback, errorCallback;
	
	inputTrackName = $("#inputTrackName");
	inputTrackDescription = $("#inputTrackDescription");
	
	if(inputTrackName.val().length == 0 || inputTrackDescription.val().length == 0) {
		
		alert("Prosimo izpolnite vsa polja!");
		return;
		
	}
	
	if(positions.length == 0) {
		
		alert("Nimate zabeleženih nobenih lokacij!");
		return;
		
	}
	
	track = createTrack(inputTrackName.val(), inputTrackDescription.val(), positions);
	
	successCallback = function(data, textStatus, jqXHR) {
		
		// Hide loader
		$.mobile.hidePageLoadingMsg();
		
		// Show notification
		alert('Uspešno poslano!');
		
		goBack();
		
	};
	
	errorCallback = function(jqXHR, textStatus, errorThrown) {
		
		// Hide loader
		$.mobile.hidePageLoadingMsg();
		
		// Show notification
		alert(textStatus + ': ' + errorThrown);
		
	};
	
	// Show loader
	$.mobile.showPageLoadingMsg('b', 'Pošiljanje...', true);
	uploadTrack(track, successCallback, errorCallback);
	
}

function savePicture() {
    var inputImageDescription = $("#imageDescription");
    if(inputImageDescription.val().length == 0) {
        alert("Vpišite opis slike!");
        return;
    }
    
    var position = positions.pop();
    var pos = new google.maps.LatLng(position.latitude, position.longitude);
    
    var mark = new google.maps.Marker({
                                      position: pos,
                                      map: map
                                      });
    mark.setAnimation(google.maps.Animation.BOUNCE);
    
    positions.push ({
                    "description":inputImageDescription.val(),
                    "latitude":position.latitude,
                    "longitude":position.longitude,
                    "photoData":lastPictureData
                    });
    
    goBack();
    
}

// onError Callback receives a PositionError object
function onError(error) {
    /* * /
	alert('Location error: \n' + 
          'code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
	/* */
}

// Map page
$('#mapPage').live('pageinit', function(event) {
	
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	navigator.geolocation.watchPosition(onSuccess, onError, { frequency: 5000, maximumAge: 15000, timeout: 7000, enableHighAccuracy: true });
	        
});
