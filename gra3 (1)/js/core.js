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
            '<a class="trip-link" href="./trip_ditale.html?'+ trip.id +'"><button type="button" class="btn btn-outline-secondary btn-sm mybtnclass">детальніше</button></a>' +
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
    $(this).button('loading');
    setTimeout(function() {
       $(this).button('reset');
    }, 8000);
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log('Success!', response);
            showSuccessMessage(50);
            $('#email').val('');
            $('#birthDate').val('');
            $('#email').val('');
            $('#phone').val('');
            $('#description').val('');
            $('#input-4').val('');
        })
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
    $('#clientName').text($('#input-4').val());
     $('#clientTrip').text($('#select-trip option:selected').text());
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
            thumbnailL1Label: { "display": true, "hideIcons": true },
            thumbnailLabel: { "display": false, "hideIcons": true },
            itemsBaseURL:     "./gallery/gallery/",
            items: [
            
                //Австрия Альбом
                { src: 'austria-1.jpg', title: 'Австрія',  ID: 1,    kind:'album' },
                { src: 'austria-1.jpg', srct: 'austria-1.jpg', title: 'Австрія', albumID: 1 },
                { src: 'austria-2.jpg', srct: 'austria-2.jpg', title: 'Австрія', albumID: 1 },
                { src: 'austria-3.jpg', srct: 'austria-3.jpg', title: 'Австрія', albumID: 1 },
                { src: 'austria-4.jpg', srct: 'austria-4.jpg', title: 'Австрія', albumID: 1 },
                { src: 'austria-5.jpg', srct: 'austria-5.jpg', title: 'Австрія', albumID: 1 },
                { src: 'austria-6.jpg', srct: 'austria-6.jpg', title: 'Австрія', albumID: 1 },
                { src: 'austria-7.jpg', srct: 'austria-7.jpg', title: 'Австрія', albumID: 1 },
                { src: 'austria-8.jpg', srct: 'austria-8.jpg', title: 'Австрія', albumID: 1 },
                { src: 'austria-9.jpg', srct: 'austria-9.jpg', title: 'Австрія', albumID: 1 },
            
            
                //Боржава Альбом
                { src: 'borgava-1.jpg', title: 'Боржава',  ID: 2,    kind:'album' },
                { src: 'borgava-1.jpg', srct: 'borgava-1.jpg', title: 'Боржава', albumID: 2 },
                { src: 'borgava-2.jpg', srct: 'borgava-2.jpg', title: 'Боржава', albumID: 2 },
                { src: 'borgava-3.jpg', srct: 'borgava-3.jpg', title: 'Боржава', albumID: 2 },
                { src: 'borgava-4.jpg', srct: 'borgava-4.jpg', title: 'Боржава', albumID: 2 },
                { src: 'borgava-5.jpg', srct: 'borgava-5.jpg', title: 'Боржава', albumID: 2 },
                { src: 'borgava-6.jpg', srct: 'borgava-6.jpg', title: 'Боржава', albumID: 2 },
                { src: 'borgava-7.jpg', srct: 'borgava-7.jpg', title: 'Боржава', albumID: 2 },
                { src: 'borgava-8.jpg', srct: 'borgava-8.jpg', title: 'Боржава', albumID: 2 },
                { src: 'borgava-9.jpg', srct: 'borgava-9.jpg', title: 'Боржава', albumID: 2 },
            
            
                //Грузія Альбом
                { src: 'georgia-1.jpg', title: 'Грузія',  ID: 3,    kind:'album' },
                { src: 'georgia-1.jpg', srct: 'georgia-1.jpg', title: '', albumID: 3 },
                { src: 'georgia-2.jpg', srct: 'georgia-2.jpg', albumID: 3 },
                { src: 'georgia-3.jpg', srct: 'georgia-3.jpg', albumID: 3 },
                { src: 'georgia-4.jpg', srct: 'georgia-4.jpg', albumID: 3 },
                { src: 'georgia-5.jpg', srct: 'georgia-5.jpg', albumID: 3 },
                { src: 'georgia-6.jpg', srct: 'georgia-6.jpg', albumID: 3 },
                { src: 'georgia-7.jpg', srct: 'georgia-7.jpg', albumID: 3 },
                { src: 'georgia-8.jpg', srct: 'georgia-8.jpg', albumID: 3 },
                { src: 'georgia-9.jpg', srct: 'georgia-9.jpg', albumID: 3 },
                { src: 'georgia-10.jpg', srct: 'georgia-10.jpg', albumID: 3 },
                { src: 'georgia-11.jpg', srct: 'georgia-11.jpg', albumID: 3 },
                { src: 'georgia-12.jpg', srct: 'georgia-12.jpg', albumID: 3 },
                { src: 'georgia-13.jpg', srct: 'georgia-13.jpg', albumID: 3 },
                { src: 'georgia-14.jpg', srct: 'georgia-14.jpg', albumID: 3 },
                { src: 'georgia-15.jpg', srct: 'georgia-15.jpg', albumID: 3 },
                { src: 'georgia-16.jpg', srct: 'georgia-16.jpg', albumID: 3 },
                { src: 'georgia-17.jpg', srct: 'georgia-17.jpg', albumID: 3 },
                { src: 'georgia-18.jpg', srct: 'georgia-18.jpg', albumID: 3 },
                { src: 'georgia-19.jpg', srct: 'georgia-19.jpg', albumID: 3 },
                { src: 'georgia-20.jpg', srct: 'georgia-20.jpg', albumID: 3 },
                { src: 'georgia-21.jpg', srct: 'georgia-21.jpg', albumID: 3 },

                //Мармароси Альбом
                { src: 'marmarosy-1.jpg', title: 'Мармароси',  ID: 4,    kind:'album' },
                { src: 'marmarosy-1.jpg', srct: 'marmarosy-1.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-2.jpg', srct: 'marmarosy-2.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-3.jpg', srct: 'marmarosy-3.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-4.jpg', srct: 'marmarosy-4.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-5.jpg', srct: 'marmarosy-5.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-6.jpg', srct: 'marmarosy-6.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-7.jpg', srct: 'marmarosy-7.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-8.jpg', srct: 'marmarosy-8.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-9.jpg', srct: 'marmarosy-9.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-10.jpg', srct: 'marmarosy-10.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-11.jpg', srct: 'marmarosy-11.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-12.jpg', srct: 'marmarosy-12.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-13.jpg', srct: 'marmarosy-13.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-14.jpg', srct: 'marmarosy-14.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-15.jpg', srct: 'marmarosy-15.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-16.jpg', srct: 'marmarosy-16.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-17.jpg', srct: 'marmarosy-17.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-18.jpg', srct: 'marmarosy-18.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-19.jpg', srct: 'marmarosy-19.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-20.jpg', srct: 'marmarosy-20.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-21.jpg', srct: 'marmarosy-21.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-22.jpg', srct: 'marmarosy-22.jpg', title: '', albumID: 4 },
                { src: 'marmarosy-23.jpg', srct: 'marmarosy-23.jpg', title: '', albumID: 4 },

                //Марокко Альбом
                { src: 'morocco-1.jpg', title: 'Марокко',  ID: 5,    kind:'album' },
                { src: 'morocco-1.jpg', srct: 'morocco-1.jpg', title: '', albumID: 5 },
                { src: 'morocco-2.jpg', srct: 'morocco-2.jpg', title: '', albumID: 5 },
                { src: 'morocco-3.jpg', srct: 'morocco-3.jpg', title: '', albumID: 5 },
                { src: 'morocco-4.jpg', srct: 'morocco-4.jpg', title: '', albumID: 5 },
                { src: 'morocco-5.jpg', srct: 'morocco-5.jpg', title: '', albumID: 5 },
                { src: 'morocco-6.jpg', srct: 'morocco-6.jpg', title: '', albumID: 5 },
                { src: 'morocco-7.jpg', srct: 'morocco-7.jpg', title: '', albumID: 5 },
                { src: 'morocco-8.jpg', srct: 'morocco-8.jpg', title: '', albumID: 5 },
                { src: 'morocco-9.jpg', srct: 'morocco-9.jpg', title: '', albumID: 5 },
                { src: 'morocco-10.jpg', srct: 'morocco-10.jpg', title: '', albumID: 5 },
                { src: 'morocco-11.jpg', srct: 'morocco-11.jpg', title: '', albumID: 5 },
                { src: 'morocco-12.jpg', srct: 'morocco-12.jpg', title: '', albumID: 5 },
                { src: 'morocco-13.jpg', srct: 'morocco-13.jpg', title: '', albumID: 5 },
                { src: 'morocco-14.jpg', srct: 'morocco-14.jpg', title: '', albumID: 5 },
                { src: 'morocco-15.jpg', srct: 'morocco-15.jpg', title: '', albumID: 5 },
                { src: 'morocco-16.jpg', srct: 'morocco-16.jpg', title: '', albumID: 5 },
                { src: 'morocco-17.jpg', srct: 'morocco-17.jpg', title: '', albumID: 5 },
                { src: 'morocco-18.jpg', srct: 'morocco-18.jpg', title: '', albumID: 5 },
                { src: 'morocco-19.jpg', srct: 'morocco-19.jpg', title: '', albumID: 5 },
                { src: 'morocco-20.jpg', srct: 'morocco-20.jpg', title: '', albumID: 5 },

                //Памір Альбом
                { src: 'pamir-1.jpg', title: 'Памір',  ID: 6,    kind:'album' },
                { src: 'pamir-1.jpg', srct: 'pamir-1.jpg', title: '', albumID: 6 },
                { src: 'pamir-2.jpg', srct: 'pamir-2.jpg', title: '', albumID: 6 },
                { src: 'pamir-3.jpg', srct: 'pamir-3.jpg', title: '', albumID: 6 },
                { src: 'pamir-4.jpg', srct: 'pamir-4.jpg', title: '', albumID: 6 },
                { src: 'pamir-5.jpg', srct: 'pamir-5.jpg', title: '', albumID: 6 },
                { src: 'pamir-6.jpg', srct: 'pamir-6.jpg', title: '', albumID: 6 },
                { src: 'pamir-7.jpg', srct: 'pamir-7.jpg', title: '', albumID: 6 },
                { src: 'pamir-8.jpg', srct: 'pamir-8.jpg', title: '', albumID: 6 },
                { src: 'pamir-9.jpg', srct: 'pamir-9.jpg', title: '', albumID: 6 },
                { src: 'pamir-10.jpg', srct: 'pamir-10.jpg', title: '', albumID: 6 },
                { src: 'pamir-11.jpg', srct: 'pamir-11.jpg', title: '', albumID: 6 },
                { src: 'pamir-12.jpg', srct: 'pamir-12.jpg', title: '', albumID: 6 },
                { src: 'pamir-13.jpg', srct: 'pamir-13.jpg', title: '', albumID: 6 },
                { src: 'pamir-14.jpg', srct: 'pamir-14.jpg', title: '', albumID: 6 },

                //Петрос Альбом
                { src: 'petros-1.jpg', title: 'Петрос',  ID: 7,    kind:'album' },
                { src: 'petros-1.jpg', srct: 'petros-1.jpg', title: '', albumID: 7 },
                { src: 'petros-2.jpg', srct: 'petros-2.jpg', title: '', albumID: 7 },
                { src: 'petros-3.jpg', srct: 'petros-3.jpg', title: '', albumID: 7 },
                { src: 'petros-4.jpg', srct: 'petros-4.jpg', title: '', albumID: 7 },
                { src: 'petros-5.jpg', srct: 'petros-5.jpg', title: '', albumID: 7 },
                { src: 'petros-6.jpg', srct: 'petros-6.jpg', title: '', albumID: 7 },
                { src: 'petros-7.jpg', srct: 'petros-7.jpg', title: '', albumID: 7 },
                { src: 'petros-8.jpg', srct: 'petros-8.jpg', title: '', albumID: 7 },
                { src: 'petros-9.jpg', srct: 'petros-9.jpg', title: '', albumID: 7 },
                { src: 'petros-10.jpg', srct: 'petros-10.jpg', title: '', albumID: 7 },
                { src: 'petros-12.jpg', srct: 'petros-11.jpg', title: '', albumID: 7 },
                { src: 'petros-12.jpg', srct: 'petros-11.jpg', title: '', albumID: 7 },
                { src: 'petros-13.jpg', srct: 'petros-13.jpg', title: '', albumID: 7 },

                //Піп Іван Чорногірській Альбом
                { src: 'pipivan-1.jpg', title: 'Піп Іван Чорногірській',  ID: 8,    kind:'album' },
                { src: 'pipivan-1.jpg', srct: 'pipivan-1.jpg', title: '', albumID: 8 },
                { src: 'pipivan-2.jpg', srct: 'pipivan-2.jpg', title: '', albumID: 8 },
                { src: 'pipivan-3.jpg', srct: 'pipivan-3.jpg', title: '', albumID: 8 },
                { src: 'pipivan-4.jpg', srct: 'pipivan-4.jpg', title: '', albumID: 8 },
                { src: 'pipivan-5.jpg', srct: 'pipivan-5.jpg', title: '', albumID: 8 },
                { src: 'pipivan-6.jpg', srct: 'pipivan-6.jpg', title: '', albumID: 8 },
                { src: 'pipivan-7.jpg', srct: 'pipivan-7.jpg', title: '', albumID: 8 },
                { src: 'pipivan-8.jpg', srct: 'pipivan-8.jpg', title: '', albumID: 8 },
                { src: 'pipivan-9.jpg', srct: 'pipivan-9.jpg', title: '', albumID: 8 },
                { src: 'pipivan-10.jpg', srct: 'pipivan-10.jpg', title: '', albumID: 8 },
                { src: 'pipivan-11.jpg', srct: 'pipivan-11.jpg', title: '', albumID: 8 },
                { src: 'pipivan-12.jpg', srct: 'pipivan-12.jpg', title: '', albumID: 8 },
                { src: 'pipivan-13.jpg', srct: 'pipivan-13.jpg', title: '', albumID: 8 },
                { src: 'pipivan-14.jpg', srct: 'pipivan-14.jpg', title: '', albumID: 8 },
                { src: 'pipivan-15.jpg', srct: 'pipivan-15.jpg', title: '', albumID: 8 },
                { src: 'pipivan-16.jpg', srct: 'pipivan-16.jpg', title: '', albumID: 8 },
                { src: 'pipivan-17.jpg', srct: 'pipivan-17.jpg', title: '', albumID: 8 },
                { src: 'pipivan-18.jpg', srct: 'pipivan-18.jpg', title: '', albumID: 8 },
                { src: 'pipivan-19.jpg', srct: 'pipivan-19.jpg', title: '', albumID: 8 },
                { src: 'pipivan-20.jpg', srct: 'pipivan-20.jpg', title: '', albumID: 8 },
                { src: 'pipivan-21.jpg', srct: 'pipivan-21.jpg', title: '', albumID: 8 },

                 //Пішконя Альбом
                { src: 'piskoniia-1.jpg', title: 'Пішконя. Негровець',  ID: 9,    kind:'album' },
                { src: 'piskoniia-1.jpg', srct: 'piskoniia-1.jpg', title: '', albumID: 9 },
                { src: 'piskoniia-2.jpg', srct: 'piskoniia-2.jpg', title: '', albumID: 9 },
                { src: 'piskoniia-3.jpg', srct: 'piskoniia-3.jpg', title: '', albumID: 9 },
                { src: 'piskoniia-4.jpg', srct: 'piskoniia-4.jpg', title: '', albumID: 9 },
                
                //Румунія Альбом
                { src: 'rumuniia-1.jpg', title: 'Румунія',  ID: 10,    kind:'album' },
                { src: 'rumuniia-1.jpg', srct: 'rumuniia-1.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-2.jpg', srct: 'rumuniia-2.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-3.jpg', srct: 'rumuniia-3.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-4.jpg', srct: 'rumuniia-4.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-5.jpg', srct: 'rumuniia-5.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-6.jpg', srct: 'rumuniia-6.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-7.jpg', srct: 'rumuniia-7.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-8.jpg', srct: 'rumuniia-8.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-9.jpg', srct: 'rumuniia-9.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-10.jpg', srct: 'rumuniia-10.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-11.jpg', srct: 'rumuniia-11.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-12.jpg', srct: 'rumuniia-12.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-13.jpg', srct: 'rumuniia-13.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-14.jpg', srct: 'rumuniia-14.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-15.jpg', srct: 'rumuniia-15.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-16.jpg', srct: 'rumuniia-16.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-17.jpg', srct: 'rumuniia-17.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-18.jpg', srct: 'rumuniia-18.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-19.jpg', srct: 'rumuniia-19.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-20.jpg', srct: 'rumuniia-20.jpg', title: '', albumID: 10 },
                { src: 'rumuniia-21.jpg', srct: 'rumuniia-21.jpg', title: '', albumID: 10 },

                //Шпиці Альбом
                { src: 'schpytsi-1.jpg', title: 'Шпиці',  ID: 11,    kind:'album' },
                { src: 'schpytsi-1.jpg', srct: 'schpytsi-1.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-2.jpg', srct: 'schpytsi-2.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-3.jpg', srct: 'schpytsi-3.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-4.jpg', srct: 'schpytsi-4.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-5.jpg', srct: 'schpytsi-5.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-6.jpg', srct: 'schpytsi-6.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-7.jpg', srct: 'schpytsi-7.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-8.jpg', srct: 'schpytsi-8.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-9.jpg', srct: 'schpytsi-9.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-10.jpg', srct: 'schpytsi-10.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-11.jpg', srct: 'schpytsi-11.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-12.jpg', srct: 'schpytsi-12.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-13.jpg', srct: 'schpytsi-13.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-14.jpg', srct: 'schpytsi-14.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-15.jpg', srct: 'schpytsi-15.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-16.jpg', srct: 'schpytsi-16.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-17.jpg', srct: 'schpytsi-17.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-18.jpg', srct: 'schpytsi-18.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-19.jpg', srct: 'schpytsi-19.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-20.jpg', srct: 'schpytsi-20.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-21.jpg', srct: 'schpytsi-21.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-22.jpg', srct: 'schpytsi-22.jpg', title: '', albumID: 11 },
                { src: 'schpytsi-23.jpg', srct: 'schpytsi-23.jpg', title: '', albumID: 11 },

                //Свидовець Альбом
                { src: 'svydovets-26.jpg', title: 'Свидовець',  ID: 12,    kind:'album' },
                { src: 'svydovets-1.jpg', srct: 'svydovets-1.jpg', title: '', albumID: 12 },
                { src: 'svydovets-2.jpg', srct: 'svydovets-2.jpg', title: '', albumID: 12 },
                { src: 'svydovets-3.jpg', srct: 'svydovets-3.jpg', title: '', albumID: 12 },
                { src: 'svydovets-4.jpg', srct: 'svydovets-4.jpg', title: '', albumID: 12 },
                { src: 'svydovets-5.jpg', srct: 'svydovets-5.jpg', title: '', albumID: 12 },
                { src: 'svydovets-6.jpg', srct: 'svydovets-6.jpg', title: '', albumID: 12 },
                { src: 'svydovets-7.jpg', srct: 'svydovets-7.jpg', title: '', albumID: 12 },
                { src: 'svydovets-8.jpg', srct: 'svydovets-8.jpg', title: '', albumID: 12 },
                { src: 'svydovets-9.jpg', srct: 'svydovets-9.jpg', title: '', albumID: 12 },
                { src: 'svydovets-10.jpg', srct: 'svydovets-10.jpg', title: '', albumID: 12 },
                { src: 'svydovets-11.jpg', srct: 'svydovets-11.jpg', title: '', albumID: 12 },
                { src: 'svydovets-12.jpg', srct: 'svydovets-12.jpg', title: '', albumID: 12 },
                { src: 'svydovets-13.jpg', srct: 'svydovets-13.jpg', title: '', albumID: 12 },
                { src: 'svydovets-14.jpg', srct: 'svydovets-14.jpg', title: '', albumID: 12 },
                { src: 'svydovets-15.jpg', srct: 'svydovets-15.jpg', title: '', albumID: 12 },
                { src: 'svydovets-16.jpg', srct: 'svydovets-16.jpg', title: '', albumID: 12 },
                { src: 'svydovets-17.jpg', srct: 'svydovets-17.jpg', title: '', albumID: 12 },
                { src: 'svydovets-18.jpg', srct: 'svydovets-18.jpg', title: '', albumID: 12 },
                { src: 'svydovets-19.jpg', srct: 'svydovets-19.jpg', title: '', albumID: 12 },
                { src: 'svydovets-20.jpg', srct: 'svydovets-20.jpg', title: '', albumID: 12 },
                { src: 'svydovets-21.jpg', srct: 'svydovets-21.jpg', title: '', albumID: 12 },
                { src: 'svydovets-22.jpg', srct: 'svydovets-22.jpg', title: '', albumID: 12 },
                { src: 'svydovets-23.jpg', srct: 'svydovets-23.jpg', title: '', albumID: 12 },
                { src: 'svydovets-24.jpg', srct: 'svydovets-24.jpg', title: '', albumID: 12 },
                { src: 'svydovets-25.jpg', srct: 'svydovets-25.jpg', title: '', albumID: 12 },
                { src: 'svydovets-26.jpg', srct: 'svydovets-26.jpg', title: '', albumID: 12 },
                { src: 'svydovets-27.jpg', srct: 'svydovets-27.jpg', title: '', albumID: 12 },
                { src: 'svydovets-28.jpg', srct: 'svydovets-28.jpg', title: '', albumID: 12 },
                { src: 'svydovets-29.jpg', srct: 'svydovets-29.jpg', title: '', albumID: 12 },
                { src: 'svydovets-30.jpg', srct: 'svydovets-30.jpg', title: '', albumID: 12 },
                { src: 'svydovets-31.jpg', srct: 'svydovets-31.jpg', title: '', albumID: 12 },
                { src: 'svydovets-32.jpg', srct: 'svydovets-32.jpg', title: '', albumID: 12 },

                 //Татри Альбом
                { src: 'tatry-1.jpg', title: 'Татри',  ID: 13,    kind:'album' },
                { src: 'tatry-1.jpg', srct: 'tatry-1.jpg', title: '', albumID: 13 },
                { src: 'tatry-2.jpg', srct: 'tatry-2.jpg', title: '', albumID: 13 },
                { src: 'tatry-3.jpg', srct: 'tatry-3.jpg', title: '', albumID: 13 },
                { src: 'tatry-4.jpg', srct: 'tatry-4.jpg', title: '', albumID: 13 },
                { src: 'tatry-5.jpg', srct: 'tatry-5.jpg', title: '', albumID: 13 },
                { src: 'tatry-6.jpg', srct: 'tatry-6.jpg', title: '', albumID: 13 },
                { src: 'tatry-7.jpg', srct: 'tatry-7.jpg', title: '', albumID: 13 },
                { src: 'tatry-8.jpg', srct: 'tatry-8.jpg', title: '', albumID: 13 },
                { src: 'tatry-9.jpg', srct: 'tatry-9.jpg', title: '', albumID: 13 },
                { src: 'tatry-10.jpg', srct: 'tatry-10.jpg', title: '', albumID: 13 },
                { src: 'tatry-11.jpg', srct: 'tatry-11.jpg', title: '', albumID: 13 },
                { src: 'tatry-12.jpg', srct: 'tatry-12.jpg', title: '', albumID: 13 },
                { src: 'tatry-13.jpg', srct: 'tatry-13.jpg', title: '', albumID: 13 },

                 //Яйко Ілемське Альбом
                { src: 'westgorgany-1.jpg', title: 'Яйко Ілемське. Західні Горгани',  ID: 14,    kind:'album' },
                { src: 'westgorgany-1.jpg', srct: 'westgorgany-1.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-2.jpg', srct: 'westgorgany-2.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-3.jpg', srct: 'westgorgany-3.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-4.jpg', srct: 'westgorgany-4.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-5.jpg', srct: 'westgorgany-5.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-6.jpg', srct: 'westgorgany-6.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-7.jpg', srct: 'westgorgany-7.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-8.jpg', srct: 'westgorgany-8.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-9.jpg', srct: 'westgorgany-9.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-10.jpg', srct: 'westgorgany-10.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-11.jpg', srct: 'westgorgany-11.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-12.jpg', srct: 'westgorgany-12.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-13.jpg', srct: 'westgorgany-13.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-14.jpg', srct: 'westgorgany-14.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-15.jpg', srct: 'westgorgany-15.jpg', title: '', albumID: 14 },
                { src: 'westgorgany-16.jpg', srct: 'westgorgany-16.jpg', title: '', albumID: 14 },

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
