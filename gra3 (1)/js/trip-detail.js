$(document).ready(function () {
	var lastIndex = $(location).attr("href").indexOf('#');
	var id;
	if (lastIndex != -1) {
		id = $(location).attr("href").substring($(location).attr("href").indexOf('?') + 1, lastIndex);

	} else {
		id = $(location).attr("href").substr($(location).attr("href").indexOf('?') + 1,2);

	}
	generateHeaderSliderDetails(id);
	generateDaysSection(id);
	generateShortInfo(id);
	generateIncludeSection(id);
	generatePointsSection(id);
	toogleGear();
	datepickerConfig();
});

function generateHeaderSliderDetails(id) {
	var trip = tours[id];
	console.log(trip);
        var tripSlideHtml =
            '<div class="slider_img header_trip_img"' +
            ' style="background-image:url(' + "'" + trip.backgroungUrl + "'" + ')">' +
            '<h2 class="bold-text">' + trip.name + '</h2>' +

            '<p>' + trip.startDate + '-' + trip.endDate + ' (' + trip.duration + ' ' + _getDurationLabel(trip.duration) + ')</p>' +
            '<p> Складність: ' + trip.difficulty + '</p>' +
            '<p> Кількість: ' + trip.groupEmount + '</p>' +
            '<h4>' + trip.price + ' ' + trip.currency + '</h4>' +
            '<a href="#contact-sec">' +
            '<button type="button" onclick=goToFrom(' + trip.id + ') class="btn mg-0 width-100 btn-outline-secondary btn-lg register-btn"> зареєструватись</button>' +
            '</a>' +
            '</div>';

        $('#header').append(tripSlideHtml);
}

function _getDurationLabel(duration) {
    var durationEnd = duration%10;
    if (durationEnd == 1) 
        return 'день';
    else if (durationEnd >= 2 && durationEnd <= 4 && duration <= 10) 
        return 'дні';
    else return 'днів';
}

function goToFrom(tripName) {
    $("#select-trip").val(tripName);
    $('html, body').animate({
        scrollTop: ($('#contact-sec').offset().top)
    }, 500);
    $("#input-4").focus();
}

function toogleGear() {
	 $('#showmenu').click(function() {
                $('.menu').slideToggle("fast");
 });
}

function datepickerConfig() {
    $('.datepicker-here').datepicker({
        startDate: new Date(1990, 1, 1)
    })
}

function generateDaysSection(id) {
	var trip = tours[id];
	console.log(trip.daysDescription);
     trip.daysDescription.forEach(function (desc,index) {
        var dayDetails = '<div class="img_wrapper">' +
            '<h2>День ' + (index + 1) + '</h2>' +
            '<p class="day-details">' + desc +'</p>' +
            '<img src="'+ trip.daysPhotosUrl[index] + '"' + 'class="img-day"/>' +
            '</div>';

        $('#daysInfo').append(dayDetails);
    });
}

function generateIncludeSection(id) {
	var trip = tours[id];
	trip.includedInPrice.forEach(function(item) {
		$('#includedInPrice').append('<li> <i class="fas fa-check-circle"></i>' + item + '</li>');
	});

	trip.nonIncludedInPrice.forEach(function(item) {
		$('#notIncludedInPrice').append('<li> <i class="far fa-times-circle"></i>' + item + '</li>');
	});
}

function generatePointsSection(id) {
	var trip = tours[id];
	trip.routePoints.forEach(function(routePoints) {
		$('#routePoints').append('<li><p>'+ routePoints +'</li></p>')
	});
}

function generateShortInfo(id) {
	var trip = tours[id];
	$('#trip-length').append('<span>' + 'Протяжність маршруту: ' + trip.routeLength + '</span>');
	$('#trip-start-finish').append('<span>' + 'Старт: ' + trip.routeStart + '. Фініш: ' + trip.routeFinish + '</span>');
	$('#trip-dates').append('<span>' + 'Дати проведення: ' + trip.startDate + '-' +  trip.endDate + '</span>');
	$('#trip-duration').append('<span>' + 'Тривалість: ' + trip.duration + '</span>');
	$('#trip-restriction').append('<span>' + trip.restriction + '</span>');
	$('#trip-aditional-info').append('<span>' + trip.additionalInfo + '</span>');
	trip.gearList.forEach(function(item) {
		$('#gear-list').append('<li>'+ item +'</li>');
	});
}