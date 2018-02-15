$(document).ready(function () {

    var uri = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=bd013c4c4ec1f6b05f4fedcf0e0b94ed&user_id=140153940@N06&format=json&nojsoncallback=1";

    $.ajax(getAjaxSettingsByURI(uri)).done(function (data) {
        showPhotos(data.photos.photo, "flickr");
        initFancybox();
    });

});
