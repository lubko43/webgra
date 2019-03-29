
$(function () {
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 600,
        fade: true,
        cssEase: 'ease-in',
        arrows: true,
        autoplay: true,
        autoplaySpeed: 15000,
        nextArrow: '<img class="arrow_left" src="./img/img/arrow_prev.png">',
        prevArrow: '<img class ="arrow_right" src="./img/img/arrow_next.png">',
         responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        dots: false
      }
    },]
        
    });
    $('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
        autoplay: true,
  arrows: true,
        nextArrow: '<img class="arrow_left" src="./img/img/arrow_prev.png">',
        prevArrow: '<img class ="arrow_right" src="./img/img/arrow_next.png">',
  fade: false,
  asNavFor: '.slider-nav',
        infinite: true
});
$('.slider-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 4,
  asNavFor: '.slider-for',
  dots: false,
    autoplay: true,
  centerMode: true,
  focusOnSelect: true,
    
});
});

// Slick galerry slider поставити senter mode
//$(function () {
//    $('.slick_gallery').slick({
//        
//        dots: false,
//        infinite: true,
//        speed: 600,
//        fade: true,
//        cssEase: 'ease-in',
//        arrows: true,
//        autoplay: true,
//        autoplaySpeed: 15000,
//        nextArrow: '<img class="arrow_left" src="./img/img/arrow_left.png">',
//        prevArrow: '<img class ="arrow_right" src="./img/img/arrow_right.png">',
//    });
//});
//var a2a_config = a2a_config || {};
//a2a_config.icon_color = "transparent,#fff";

// Create a new form, then add a checkbox question, a multiple choice question,
// a page break, then a date question and a grid of questions.
//var form = FormApp.create('New Form');
//var item = form.addCheckboxItem();
//item.setTitle('What condiments would you like on your hot dog?');
//item.setChoices([
//        item.createChoice('Ketchup'),
//        item.createChoice('Mustard'),
//        item.createChoice('Relish')
//    ]);
//form.addMultipleChoiceItem()
//    .setTitle('Do you prefer cats or dogs?')
//    .setChoiceValues(['Cats','Dogs'])
//    .showOtherOption(true);
//form.addPageBreakItem()
//    .setTitle('Getting to know you');
//form.addDateItem()
//    .setTitle('When were you born?');
//form.addGridItem()
//    .setTitle('Rate your interests')
//    .setRows(['Cars', 'Computers', 'Celebrities'])
//    .setColumns(['Boring', 'So-so', 'Interesting']);
//Logger.log('Published URL: ' + form.getPublishedUrl());
//Logger.log('Editor URL: ' + form.getEditUrl());
