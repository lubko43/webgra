/* nanogallery2 - v2.1.0 - 2018-03-05 - http://nanogallery2.nanostudio.org */
/**!
 * @preserve nanogallery2 - FLICKR data provider
 * Homepage: http://nanogallery2.nanostudio.org
 * Sources:  https://github.com/nanostudio-org/nanogallery2
 *
 * License:  GPLv3 and commercial licence
 * 
*/
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery","nanogallery2"],a):a("object"==typeof exports&&"function"==typeof require?require(["jquery","nanogallery2"]):jQuery)}(function(a){jQuery.nanogallery2.data_flickr=function(a,b){function c(a,b,c){h.O.debugMode&&(console.log("Flickr parse photos:"),console.dir(c)),jQuery.each(c,function(a,c){var d=c.id,f=c.url_sq,g=c.title;""!=h.O.thumbnailLabel.get("title")&&(g=n(f));var j=c.description._content,k=75,l=75,m=i.photoAvailableSizesStr.length-1;h.O.flickrSkipOriginal&&m--;for(var a=m;a>=0;a--)if(void 0!=c["url_"+i.photoAvailableSizesStr[a]]){f=c["url_"+i.photoAvailableSizesStr[a]],k=parseInt(c["width_"+i.photoAvailableSizesStr[a]]),l=parseInt(c["height_"+i.photoAvailableSizesStr[a]]);break}var o={};for(var p in c)0!=p.indexOf("height_")&&0!=p.indexOf("width_")&&0!=p.indexOf("url_")||(o[p]=c[p]);var q=void 0!==c.tags?c.tags:"",r=NGY2Item.New(h,g,j,d,b,"image",q);r.setMediaURL(f,"img"),r.imageWidth=k,r.imageHeight=l;var s={url:{l1:{xs:"",sm:"",me:"",la:"",xl:""},lN:{xs:"",sm:"",me:"",la:"",xl:""}},width:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}},height:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}}};s=e(s,c,"l1"),s=e(s,c,"lN"),r.thumbs=s;var t=h.O.fnProcessData;null!==t&&("function"==typeof t?t(r,"flickr",c):window[t](r,"flickr",c))}),h.I[a].contentIsLoaded=!0}function d(a,b,c){h.O.debugMode&&(console.log("Flickr parse list of albums:"),console.dir(c)),jQuery.each(c,function(a,c){var d=c.title._content;if(0==c.visibility_can_see_set)return!0;if(o(d,c.id)){var f=c.id,g=void 0!=c.description._content?c.description._content:"",i={};for(var j in c.primary_photo_extras)i[j]=c.primary_photo_extras[j];var k="";void 0!==c.primary_photo_extras&&void 0!==c.primary_photo_extras.tags&&(k=c.primary_photo_extras.tags);var l=NGY2Item.New(h,d,g,f,b,"album",k);l.numberItems=c.photos,l.thumbSizes=i;var m={url:{l1:{xs:"",sm:"",me:"",la:"",xl:""},lN:{xs:"",sm:"",me:"",la:"",xl:""}},width:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}},height:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}}};m=e(m,c.primary_photo_extras,"l1"),m=e(m,c.primary_photo_extras,"lN"),l.thumbs=m;var n=h.O.fnProcessData;null!==n&&("function"==typeof n?n(l,"flickr",c):window[n](l,"flickr",c))}}),h.I[a].contentIsLoaded=!0}function e(a,b,c){var d=1;!0===h.tn.opt[c].crop&&(d=h.O.thumbnailCropScaleFactor);for(var e=["xs","sm","me","la","xl"],g=0;g<e.length;g++)if("auto"==h.tn.settings.width[c][e[g]]||""==h.tn.settings.width[c][e[g]]){var i="height_",j=Math.ceil(h.tn.settings.height[c][e[g]]*h.tn.scale*d*h.tn.settings.mosaic[c+"Factor"].h[e[g]]),k=f(i,j,b);a.url[c][e[g]]=k.url,a.width[c][e[g]]=k.width,a.height[c][e[g]]=k.height}else if("auto"==h.tn.settings.height[c][e[g]]||""==h.tn.settings.height[c][e[g]]){var i="width_",j=Math.ceil(h.tn.settings.width[c][e[g]]*h.tn.scale*d*h.tn.settings.mosaic[c+"Factor"].w[e[g]]),k=f(i,j,b);a.url[c][e[g]]=k.url,a.width[c][e[g]]=k.width,a.height[c][e[g]]=k.height}else{var i="height_",j=Math.ceil(h.tn.settings.height[c][e[g]]*h.tn.scale*d*h.tn.settings.mosaic[c+"Factor"].h[e[g]]);h.tn.settings.width[c][e[g]]>h.tn.settings.height[c][e[g]]&&(i="width_",j=Math.ceil(h.tn.settings.width[c][e[g]]*h.tn.scale*d*h.tn.settings.mosaic[c+"Factor"].w[e[g]]));var k=f(i,j,b);a.url[c][e[g]]=k.url,a.width[c][e[g]]=k.width,a.height[c][e[g]]=k.height}return a}function f(a,b,c){for(var d={url:"",width:0,height:0},e=0,f=0;f<i.thumbAvailableSizes.length;f++){var g=c[a+i.photoAvailableSizesStr[f]];if(void 0!=g&&(e=f,g>=b))break}var h=i.photoAvailableSizesStr[e];return d.url=c["url_"+h],d.width=parseInt(c["width_"+h]),d.height=parseInt(c["height_"+h]),d}function g(){}var h=a,i={url:function(){return"https://api.flickr.com/services/rest/"},thumbSize:"               sq",thumbAvailableSizes:new Array(75,100,150,240,500,640),thumbAvailableSizesStr:new Array("sq","t","q","s","m","z"),photoSize:"0",photoAvailableSizes:new Array(75,100,150,240,500,640,1024,1024,1600,2048,1e4),photoAvailableSizesStr:new Array("sq","t","q","s","m","z","b","l","h","k","o"),ApiKey:"2f0e634b471fdb47446abcb9c5afebdc"},j=function(a,b,e,f){var g=NGY2Item.GetIdx(h,a),j="",k="image";"NONE"==h.O.photoset.toUpperCase()||"NONE"==h.O.album.toUpperCase()?j=i.url()+"?&method=flickr.people.getPublicPhotos&api_key="+i.ApiKey+"&user_id="+h.O.userID+"&extras=description,views,tags,url_o,url_sq,url_t,url_q,url_s,url_m,url_z,url_b,url_h,url_k&per_page=500&format=json":0==h.I[g].GetID()?(j=i.url()+"?&method=flickr.photosets.getList&api_key="+i.ApiKey+"&user_id="+h.O.userID+"&per_page=500&primary_photo_extras=tags,url_o,url_sq,url_t,url_q,url_s,url_m,url_l,url_z,url_b,url_h,url_k&format=json",k="album"):j=i.url()+"?&method=flickr.photosets.getPhotos&api_key="+i.ApiKey+"&photoset_id="+h.I[g].GetID()+"&extras=description,views,tags,url_o,url_sq,url_t,url_q,url_s,url_m,url_l,url_z,url_b,url_h,url_k&format=json",h.O.debugMode&&console.log("Flickr URL: "+j),l(!0),jQuery.ajaxSetup({cache:!1}),jQuery.support.cors=!0;var n=setTimeout(function(){l(!1),m(h,"Could not retrieve AJAX data...")},6e4),o=[],q=function(){clearTimeout(n),l(!1),"album"==k?d(g,a,o):c(g,a,o),p(a),null!==b&&void 0!==b&&b(e,f,null)},r=function(a,b){jQuery.getJSON(a+"&page="+b+"&jsoncallback=?",function(c,d,e){var f=0;if("album"==k){if(void 0!==c.stat&&"fail"===c.stat)return m(h,"Could not retrieve Flickr album list: "+c.message+" (code: "+c.code+")."),!1;o=o.concat(c.photosets.photoset),f=c.photosets.pages}else if("NONE"==h.O.photoset.toUpperCase()||"NONE"==h.O.album.toUpperCase())o=o.concat(c.photos.photo),f=c.photos.pages;else{if(void 0!==c.stat&&"fail"===c.stat)return m(h,"Could not retrieve Flickr album: "+c.message+" (code: "+c.code+")."),!1;""==h.I[g].title&&(h.I[g].title=c.photoset.title),o=o.concat(c.photoset.photo),f=c.photoset.pages}f>b?r(a,b+1):q()}).fail(function(a,b,c){clearTimeout(n),l(!1),m(h,"Could not retrieve Flickr ajax data: "+b+", "+c)})};r(j,1)},k=function(a,b){b()},l=NGY2Tools.PreloaderDisplay.bind(h),m=NGY2Tools.NanoAlert,n=NGY2Tools.GetImageTitleFromURL.bind(h),o=NGY2Tools.FilterAlbumName.bind(h),p=NGY2Tools.AlbumPostProcess.bind(h);switch(b){case"GetHiddenAlbums":var q=arguments[2],r=arguments[3];k(q,r);break;case"AlbumGetContent":var s=arguments[2],r=arguments[3];j(s,r,arguments[4],arguments[5]);break;case"Init":g()}}});