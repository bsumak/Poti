/*

Track sample JSON code

{
   "description":"Description 1",
   "locations":{
      "location":[
         {
            "description":"Opis",
            "latitude":"12.3",
            "longitude":"32.1"
         },
         {
            "description":"Opis",
            "latitude":"12.3",
            "longitude":"32.1",
            "photoData":"/9j/4AAQSkZJRgABAQEBBgEGAAD/2wBDAAEBAQ..."
         }
      ]
   },
   "name":"Track 1"
}

*/

function createTrack(name, description, locations) {
	
	return {
		   "description": description,
		   "locations": {
		      "location": locations
		   },
		   "name": name
		}
	
}

function uploadTrack(track, successCallback, errorCallback) {
	
	$.ajax({
	  type: 'POST',
	  url: serviceURL + '/rs/upload/track',
	  data: JSON.stringify(track),
	  success: successCallback,
	  error: errorCallback,
	  contentType: 'application/json'
	});
	
}
