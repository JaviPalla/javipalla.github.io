$(document).ready(function () {

    if (context.server == "500px") {
        var uri = "https://api.500px.com/v1/photos?consumer_key=whAIfvat7ZuCzX2fPpXb1QbSCBTKLp6RA4pTczRm&feature=user&username=javierpallares&sort=created_at&image_size=20,1080";

        $.ajax(getAjaxSettingsByURI(uri)).done(function (data) {
            showProjects(data.photos);
        });
    }
});
