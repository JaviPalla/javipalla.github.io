 function initFancybox() {
     $("[data-fancybox]").fancybox({
         'transitionIn': 'elastic',
         'transitionOut': 'elastic',
         'speedIn': 600,
         'speedOut': 200,
         'overlayShow': false
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

     if (server == "flickr") {
         //Retrieving only first six photos
         $("#photo1").append(getFlickrPhoto(shuffledData[0]));
         $("#photo2").append(getFlickrPhoto(shuffledData[1]));
         $("#photo3").append(getFlickrPhoto(shuffledData[2]));
         $("#photo4").append(getFlickrPhoto(shuffledData[3]));
         $("#photo5").append(getFlickrPhoto(shuffledData[4]));
         $("#photo6").append(getFlickrPhoto(shuffledData[5]));
         $("#photos").show();
     } else {
         $("#photo1").append(get500pxPhotos(shuffledData[0]));
         $("#photo2").append(get500pxPhotos(shuffledData[1]));
         $("#photo3").append(get500pxPhotos(shuffledData[2]));
         $("#photo4").append(get500pxPhotos(shuffledData[3]));
         $("#photo5").append(get500pxPhotos(shuffledData[4]));
         $("#photo6").append(get500pxPhotos(shuffledData[5]));
         $("#photos").show();
     }

 }

 function getFlickrPhoto(gp) {
     var farmId = gp.farm;
     var serverId = gp.server;
     var id = gp.id;
     var secret = gp.secret;

     var photoLink = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg';
     var photoLinkBig = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_b.jpg';

     var photo = '<img src="' + photoLink + '"/>';
     return '<a href="' + photoLinkBig + '" data-fancybox>' + photo + '</a>';
 }

 function get500pxPhotos(gp) {
     var photoLink = gp.images[0].url;
     var photoLinkBig = gp.images[1].url;
     var photo = '<img src="' + photoLink + '"/>';
     return '<a href="' + photoLinkBig + '" data-fancybox>' + photo + '</a>';
 }
