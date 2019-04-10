/*------- Page Loader -------*/

if ((".loader").length) {
    // show Preloader until the website ist loaded
    $(window).on('load', function () {
        $(".loader").fadeOut("slow");
    });
}

$(document).ready(function () {
    generateForm();
    generateTripSection();
    generateHeaderSlider();
    generateGallery();
    phoneMask();
    datepickerConfig();
    deleteGalleriesButton();
    showMoreLess();
});
/*------- Smooth Scroll -------*/

$('a[href^="#"]').on('click', function (event) {

    var target = $($(this).attr('href'));

    if (target.length) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
//btn.onclick = function() {
//    modal.style.display = "block";
//}

// When the user clicks on <span> (x), close the modal
//span.onclick = function() {
//    modal.style.display = "none";
//}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function generateForm() {
    tours.forEach(function (trip) {
        var optionHtml = '<option value=' + trip.id + '>' + trip.name + '</option>';
        $("#select-trip").append(optionHtml);
    });
}

function goToFrom(tripName) {
    $("#select-trip").val(tripName);
    $('html, body').animate({
        scrollTop: ($('#contact-sec').offset().top)
    }, 500);
    $("#input-4").focus();
}

function generateHeaderSlider() {
    tours.forEach(function (trip, index) {
        var tripSlideHtml = '<div class="img_wrapper">' +
            '<div class="slider_img slider_img' + (index + 1) + '"' +
            ' style="background-image:url(' + "'" + trip.backgroungUrl + "'" + ')">' +
            '<p>' + trip.startDate + '-' + trip.endDate + ' (' + trip.duration + ' ' + _getDurationLabel(trip.duration) + ')</p>' +
            '<h2 class="bold-text">' + trip.name + '</h2>' +
            '<h4>' + trip.price + ' ' + trip.currency + '</h4>' +
            '<a href="#contact-sec">' +
            '<button type="button" onclick=goToFrom(' + trip.id + ') class="btn mg-0 width-100 btn-outline-secondary btn-lg register-btn"> зареєструватись</button>' +
            '</a>' +
            '</div>' +
            '</div>';

        $('#myCarousel .slider').append(tripSlideHtml);
    }); 
}

function generateTripSection() {
    // load 
    // load partial

    tours.forEach(function (trip, index) {
        var wrapperDiv = '<div class="wrap "></div>'
        var tripHtml = '<div class="trip-info"> <!-- Change go bgr-url attr> -->' +
            '<div class="halfinvis"></div>' +
            '<div class="halfdiv">' +
            '  <h4 class="text-center trip-name">' + trip.name + '</h4>' +
            '<ul><li class="trip-dates"><i></i>' + trip.startDate + '-' + trip.endDate + '</li>' +
            '<li class="trip-price"><i></i>' + trip.price + ' ' + trip.currency + '</li>' +
            '<li class="trip-quantity"><i></i>Розмір групи ' + trip.groupEmount + '</li>' +
            '<li class="trip-difficulty"><i></i>Складність ' + trip.difficulty + '</li>' +
            '</ul>' +
            '<div class="text-center">' +
            '<a class="trip-link" href="./trip_ditale.html"><button type="button" class="btn btn-outline-secondary btn-sm mybtnclass">детальніше</button></a>' +
            '        <button onclick=goToFrom(' + trip.id + ') id="trip' + trip.id + '" type="button" class="btn btn-secondary btn-sm ">приєднуюсь</button>' +
            '</div></div></div>';
        if (index % 2 == 0) {
            $('#trip-section').append(wrapperDiv);
            var root = $('#trip-section').find(".wrap:last");
            console.log(trip);
        }


        $('#trip-section').find(".wrap:last").append(tripHtml).find(".trip-info:last").css("background-image", "url('" + trip.backgroungUrl + "')");



        // // bind trip details
        // tripPartial.getElementsByClassName('trip-name').innerText = trip.name;
        // tripPartial.getElementsByClassName('trip-dates').innerText = trip.startDate;
        // tripPartial.getElementsByClassName('trip-name').innerText = trip.name;
    })
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-110px";
    }
    prevScrollpos = currentScrollPos;
}

function _getDurationLabel(duration) {
    var durationEnd = duration%10;
    if (durationEnd == 1) 
        return 'день';
    else if (durationEnd >= 2 && durationEnd <= 4 && duration <= 10) 
        return 'дні';
    else return 'днів';
}

function phoneMask() {
    $("#phone").mask("(999) 999-9999");
    $("#phone").on("blur", function () {
        var last = $(this).val().substr($(this).val().indexOf("-") + 1);

        if (last.length == 5) {
            var move = $(this).val().substr($(this).val().indexOf("-") + 1, 1);

            var lastfour = last.substr(1, 4);

            var first = $(this).val().substr(0, 9);

            $(this).val(first + move + '-' + lastfour);
        }
    });
}

$('#ok').click(function () { showSuccessMessage(500) });

const scriptURL = 'https://script.google.com/macros/s/AKfycbz_eVlycdqzYLJNVBlIRQT6HTOzz6RRsyb_P1ksVwBSnPTBc0NF/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log('Success!', response);
            showSuccessMessage(50);
        }
        )
        .catch(error => console.error('Error!', error.message))
})

function datepickerConfig() {
    $('.datepicker-here').datepicker({
        startDate: new Date(1990, 1, 1)
    })
}

function deleteGalleriesButton() {
     var navMain = $("#navbarCollapse1");
     navMain.on("click", "a", null, function () {
         navMain.collapse('hide');
     });
}

function showSuccessMessage(nr) {
    $('.message').toggleClass('comein');
    $('.check').toggleClass('scaledown');
    $('#go').fadeToggle(nr);
}

function generateGallery () {
    $("#nanogallery2").nanogallery2({
            thumbnailHeight:  235,
            thumbnailWidth:   450,
            thumbnailGutterWidth: 20,
            thumbnailGutterHeight: 20,
            thumbnailDisplayTransition:"fadeIn",
            thumbnailHoverEffect2: "imageScale150Outside|scale120",
            thumbnailBorderHorizontal:0,
            thumbnailBorderVertical:0,
            breadcrumbAutoHideTopLevel: true,
            itemsBaseURL:     "./gallery/1/",
            items: [
            {
                src:          '1.jpg',    // image url
                srct:         '1.jpg',  // thumbnail url
                title:        'Title Image1',    // media title
                description:  'Description1'     // media description
            },
            { src: '2.jpg', srct: '2.jpg',  title: 'Title Image2' },
            { src: '3.jpg', srct: '3.jpg', title: 'Title Image3' }
            ]
      });
}

function showMoreLess() {
        // Configure/customize these variables.
        var showChar = 300;  // How many characters are shown by default
        var ellipsestext = "...";
        var moretext = " Більше >";
        var lesstext = "Сховати ";
        
    
        $('.more').each(function() {
            var content = $(this).html();
     
            if(content.length > showChar) {
     
                var c = content.substr(0, showChar);
                var h = content.substr(showChar, content.length - showChar);
     
                var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
     
                $(this).html(html);
            }
     
        });
     
        $(".morelink").click(function(){
            if($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(moretext);
            } else {
                $(this).addClass("less");
                $(this).html(lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
        });
}
