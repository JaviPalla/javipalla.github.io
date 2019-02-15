$(document).ready(function () {

    if (context.server == "500px") {
        var uri = "https://api.behance.net/v2/users/pallaphotodesign/projects?client_id=iGqXPL6wfu6phLEeERBqagwAPFGz9oaJ";

        $.ajax(getAjaxSettingsByURI(uri)).done(function (data) {
            showPhotos(data.photos);
            initFancybox();

        });
    }
});
