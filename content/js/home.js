$(document).ready(function () {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=bd013c4c4ec1f6b05f4fedcf0e0b94ed&user_id=140153940@N06&format=json&nojsoncallback=1",
        "method": "GET",
        "headers": {}
    }

    $.ajax(settings).done(function (data) {
        
        console.log(data.photos.photo);
        
        var shuffledData = _.shuffle(data.photos.photo);
            
        $.each(shuffledData, function (i, gp) {

            var farmId = gp.farm;
            var serverId = gp.server;
            var id = gp.id;
            var secret = gp.secret;
        
            
            $("#photos").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"/>');

        });
    });
});
