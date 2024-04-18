const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    navPosition: "bottom",
    speed: 1000,
    responsive: {
        320: {
            nav: true,
        },

        768: {
            nav: true,
        },
        992: {
            nav: true
        },
        1100: {
            nav: false
        }
    }
  });

document.querySelector('.prev').addEventListener ('click', function() {
    slider.goTo('prev'); 
});

document.querySelector('.next').addEventListener ('click', function() {
    slider.goTo('next'); 
});

$(document).ready(function(){
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i){
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    // modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function(){
            $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });
    $(window).on('click', function(e){
        if (e.target.classList.contains('overlay')){
            $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
        }
    });

    // validate

    function validateForms(form){
        $(form).validate({
            rules: {
             name: "required",
             phone: "required",
             email: {
                 required: true,
                 email: true
             }
            },
            messages: {
             name: "Пожалуйста, введите свое имя",
             phone: "Пожалуйста, введите свой номер телефона",
             email: {
               required: "Пожалуйста, введите свою почту",
               email: "Неправильно введен адрес почты"
             }
           } 
         });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+375(99) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');



            $('form').trigger('reset');
        });
        return false;
    });

    //scroll and pageup

    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    })
});