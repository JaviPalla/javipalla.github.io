var context = {
    sfdata: null,
    showedCounter: 5,
    server: "500px"
}

function initFancybox() {
    $("[data-fancybox]").fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        'overlayShow': false,
        afterClose: function (instance, slide) {
            var href = slide.src;
            var currentPhoto = $("[href = '" + href + "']");
            currentPhoto.hide();
            context.showedCounter++;
            if (context.showedCounter > context.sfdata.length - 1) {
                context.showedCounter = 0;
            }
            var srcPhotos = getSrcPhotos(context.sfdata[context.showedCounter]);
            var currentImg = currentPhoto.find("img");
            currentImg.attr("src", srcPhotos.sm);
            currentPhoto.attr("href", srcPhotos.bg);
            currentPhoto.addClass("animated fadeIn");
            currentPhoto.show();
        }
    });
}

function getAjaxSettingsByURI(uri) {
    return settings = {
        "async": true,
        "crossDomain": true,
        "url": uri,
        "method": "GET",
        "headers": {}
    }
}

function showPhotos(photos, server) {
    var shuffledData = _.shuffle(photos);
    context.sfdata = shuffledData;
    context.server = server;

    //Retrieving only first six photos
    $("#photo1").append(getPhoto(shuffledData[0]));
    $("#photo2").append(getPhoto(shuffledData[1]));
    $("#photo3").append(getPhoto(shuffledData[2]));
    $("#photo4").append(getPhoto(shuffledData[3]));
    $("#photo5").append(getPhoto(shuffledData[4]));
    $("#photo6").append(getPhoto(shuffledData[5]));
    $("#photos").show();

}

function getPhoto(photo) {
    if (context.server == "flickr") {
        return getFlickrPhoto(photo);
    } else {
        return get500pxPhotos(photo);
    }
}

function getFlickrPhoto(gp) {
    var flickrSettings = getFlickrSettings(gp);
    var flickrPhotos = getFlickrSrcPhotos(gp);
    var photoLink = flickrPhotos.sm;
    var photoLinkBig = flickrPhotos.bg;
    return generateHTMLPhoto(photoLink, photoLinkBig);
}

function getFlickrSettings(gp) {
    return {
        farmId: gp.farm,
        serverId: gp.server,
        id: gp.id,
        secret: gp.secret
    }
}

function get500pxPhotos(gp) {
    var photos500px = get500pxSrcPhotos(gp);
    var photoLink = photos500px.sm;
    var photoLinkBig = photos500px.bg;
    return generateHTMLPhoto(photoLink, photoLinkBig);
}

function getSrcPhotos(gp) {
    if (context.server == "flickr") {
        return getFlickrSrcPhotos(gp);
    } else {
        return get500pxSrcPhotos(gp);
    }
}

function getFlickrSrcPhotos(gp) {
    var flickrSettings = getFlickrSettings(gp);
    var sm = 'https://farm' + flickrSettings.farmId + '.staticflickr.com/' + flickrSettings.serverId + '/' + flickrSettings.id + '_' + flickrSettings.secret + '.jpg';
    var bg = 'https://farm' + flickrSettings.farmId + '.staticflickr.com/' + flickrSettings.serverId + '/' + flickrSettings.id + '_' + flickrSettings.secret + '_b.jpg';
    return {
        sm: sm,
        bg: bg
    };
}

function get500pxSrcPhotos(gp) {
    var sm = gp.images[0].url;
    var bg = gp.images[1].url;
    return {
        sm: sm,
        bg: bg
    };
}

function generateHTMLPhoto(sm, bg) {
    var photo = '<img src="' + sm + '"/>';
    return '<a href="' + bg + '" data-fancybox>' + photo + '</a>';
}

$(document).ready(function () {
    $('body').scrollspy({
        target: '#navbarjp'
    })
    window.onresize = function (event) {
        var imgHome = $("#whoami").find("img");
        imgHome.css("height", window.innerHeight);
        var overlayedDiv = $(".overlayed");
        overlayedDiv.css("top", window.innerHeight / 2);
    };

    $('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg'); // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            } // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            } // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a'); // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
});
