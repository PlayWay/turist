//--------GENERAL-------//
var timerID = null;
var hotelPageSlider = null;
var navigation = '';
var item = '';
var position = 0;
var main = '';
var rooms = '';
var about = '';
var location = '';
var feedbacks = '';
var formBooking = '';
var hotelLeft = '';
var hotelLeftPosition = 0;
var hotelTitle = '';
var hotelTitleText = '';
var formBookingStart = 0;
var formBookingWidth =0;
var formBookingPositionLeft = 0;
var valueTo = $('#price-value-to');
var valueFrom = $('#price-value-from');
var countSearch = 0;

$(".to-anchor").on("click", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id  = $(this).attr('href'),

        //узнаем высоту от начала страницы до блока на который ссылается якорь
        top = $(id).offset().top - 80;

    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top}, 700);
});

$(".to-anchor-tablet").on("click", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    if ($(document).width() >= 768) {
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),

            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top - 80;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 700);
    }
});


//SIDEBAR

//Мобильное меню(sidebar)
$('.header__button--hamburger').on('click', function () {
    var navList = document.getElementsByClassName('header__menu');
    var header = $('.header');

    header.toggleClass('open-menu');
    $(this).toggleClass('active');

    if (header.hasClass('open-menu')) {
        scrollLock.hide(navList[0]);
    } else {
        scrollLock.show();
    }
})

//SORT
$('.select').on('click',function () {

    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
    } else {
        $(this).addClass('active');
    }
})

$('.select__option').on('click',function () {
    var value = $(this).closest('.select').find('.select__value');
    value.removeClass('select__value--up select__value--down');

    value.find('span').html('по ' + $(this).find('span').html());

    if ($(this).hasClass('select__option--up')) {
        value.addClass('select__value--up')
    } else if ($(this).find('span').html() === 'популярности') {

    } else {
        value.addClass('select__value--down')
    }

})

// $('.select').on('click',function (e) {
//     if(($(e.target).hasClass('select'))) {
//         console.log('NO')
//     } else {
//         console.log('YES')
//     }
// })

$('.button--eye').on('click', function () {
    $(this).toggleClass('active');
})


//При клике за пределы объекта:
$('.header').on('click',function (e) {
    var $popup = $('.header');
    //SIDEBAR
    if ($(e.target).hasClass('open-menu')) {
        $popup.removeClass('open-menu');
        $('.button--hamburger').removeClass('active');
        scrollLock.show();
    }
    //выпадающего меню
    if ($(e.target).hasClass('darken')) {
        $popup.removeClass('darken');
        $('.search').removeClass('active');
        $('.nav__item--toggle').removeClass('active');
        scrollLock.show();
    }

})

//Выпадающий список в мобильном меню
$('.nav__item--toggle').on('click', function () {
    if (window.innerWidth >= 768 && $(document).width() < 1200) {
        $('.nav__item--toggle').removeClass('active');
        $('.header').addClass('darken')
        $(this).addClass('active');
    } else if ($(document).width() < 768){
        $(this).toggleClass('active');
        $('.nav__list').animate({scrollTop: $(this).offset().top - 70}, 400);
    }
})


if ($(document).width() >= 1200) {
    var header = $('.header');

    $('.nav__item--toggle').hover(function() {
        if (!(header.hasClass('darken'))) {
            header.addClass('darken')
        }
    }, function() {
        header.removeClass('darken')
    });
}
//SEARCH

//Список результатов
$('.search__input').children('input').on('keyup', function () {
    var searchResults = $(this).closest('.search').find('.search__results');
    var main = $('.main');

    if ($(this).val().length >= 3) {
        searchResults.addClass('active');
        console.log($(this).closest('.search__input').hasClass('search__input--blue-search'))
        if ($(this).closest('.search__input').hasClass('search__input--index-search')) {
            main.addClass('darken');
        }

        if ($(this).closest('.search__input').hasClass('input--blue-search')) {
            var searchBlue = $('.search__results--blue');
            if (searchBlue.hasClass('active')) {
                searchBlue.css('max-height', window.innerHeight - $('.search__results--blue').offset().top - $('.search__popular').outerHeight())
            }
        }
    } else {
        searchResults.removeClass('active');
        main.removeClass('darken');
        $('.search__results--blue').css('max-height','0');
    }
})

$('.main').on('click',function (e) {
    var $popup = $('.main');
    if($(e.target).hasClass('darken')) {
        $('.search__results').removeClass('active');
        $popup.removeClass('darken');
    }
})

//Кнопка search
$('.header__button--search,.header__button--blue-search').on('click', function () {
    $('.search--blue').addClass('active');
    $('.header').addClass('darken').removeClass('open-menu');
    $('.nav__item--toggle').removeClass('active');
    if ($(document).width() < 1200) {
        scrollLock.hide();
    }
});

//Закрыть search
$('.search__close').on('click', function () {
    $('.search--blue').removeClass('active');
    $('.header').removeClass('darken');
    if ($(document).width() < 1200) {
        scrollLock.show();
    }
});


//Map hotel-page
function initMap() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [48.786293, 44.751867],
        controls: [],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 13
    },{autoFitToViewport: 'always'});
    //Метка
    placemark = new ymaps.Placemark([48.786293, 44.751867],
        {
            balloonPanelMaxMapArea: 0
        },
        {
            balloonPanelMaxMapArea: 0,
            balloonAutoPan: false,
            iconLayout: 'default#image',
            //     // Своё изображение иконки метки.
            iconImageHref: 'img/maps-and-flags.png',
            //     // Размеры метки.
            iconImageSize: [25, 35],
            //     // Смещение левого верхнего угла иконки относительно
            //     // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            //     // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15]
        });
    //Добавление метки на карту
    myMap.geoObjects.add(placemark);

    myMap.controls.add('fullscreenControl');
}

//Panorama hotel-page
function initPanorama() {
    // Для начала проверим, поддерживает ли плеер браузер пользователя.
    if (!ymaps.panorama.isSupported()) {
        // Если нет, то просто ничего не будем делать.
        return;
    }

    // Ищем панораму в переданной точке.
    var myPanoram = new ymaps.panorama.locate([48.786293, 44.751867]).done(
        function (panoramas) {
            // Убеждаемся, что найдена хотя бы одна панорама.
            if (panoramas.length > 0) {
                // Создаем плеер с одной из полученных панорам.
                var player = new ymaps.panorama.Player(
                    'panorama',
                    // Панорамы в ответе отсортированы по расстоянию
                    // от переданной в panorama.locate точки. Выбираем первую,
                    // она будет ближайшей.
                    panoramas[0],
                    // Зададим направление взгляда, отличное от значения
                    // по умолчанию.
                    {direction: [256, 16], controls: ['fullscreenControl']}
                );
            }
        },
        function (error) {
            // Если что-то пошло не так, сообщим об этом пользователю.
            alert(error.message);
        }
    );
}

//Map all-hotels
function initMapAllHotels() {
    // Создание карты.
    var mapAllHotels = new ymaps.Map("map-allHotels", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [48.786293, 44.751867],
        controls: ['typeSelector','fullscreenControl','zoomControl','zoomControl'],
        behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch","scrollZoom"],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 9
    }, {autoFitToViewport: 'always'});

    MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="hotel hotel--balloon">\n' + '<div class="hotel hotel__inner">' + '$[[options.contentLayout observeSize minWidth=auto maxWidth=250 minHeight=295 maxHeight=350]]\n' + '</div>' + '<div class="hotel__close-button button"><span></span></div>\n' + '<div class="hotel__arrow"></div>\n' +
        '</div>',
        {
            /**
             * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
             * @function
             * @name build
             */
            build: function () {
                this.constructor.superclass.build.call(this);

                this._$element = $('.hotel--balloon', this.getParentElement());

                this.applyElementOffset();

                this._$element.find('.hotel__close-button')
                    .on('click', $.proxy(this.onCloseClick, this));
            },

            /**
             * Удаляет содержимое макета из DOM.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
             * @function
             * @name clear
             */
            clear: function () {
                this._$element.find('.hotel__close-button')
                    .off('click');

                this.constructor.superclass.clear.call(this);
            },

            /**
             * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onSublayoutSizeChange
             */
            onSublayoutSizeChange: function () {
                MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                if (!this._isElement(this._$element)) {
                    return;
                }

                this.applyElementOffset();

                this.events.fire('shapechange');
            },

            /**
             * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name applyElementOffset
             */
            applyElementOffset: function () {
                this._$element.css({
                    left: -(this._$element[0].offsetWidth / 2),
                    top: -(this._$element[0].offsetHeight + this._$element.find('.hotel__arrow')[0].offsetHeight - 65)
                });
            },

            /**
             * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onCloseClick
             */
            onCloseClick: function (e) {
                e.preventDefault();

                this.events.fire('userclose');
            },

            /**
             * Используется для автопозиционирования (balloonAutoPan).
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
             * @function
             * @name getClientBounds
             * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
             */
            getShape: function () {
                if (!this._isElement(this._$element)) {
                    return MyBalloonLayout.superclass.getShape.call(this);
                }

                var position = this._$element.position();

                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                    [position.left, position.top], [
                        position.left + this._$element[0].offsetWidth,
                        position.top + this._$element[0].offsetHeight + this._$element.find('.hotel__arrow')[0].offsetHeight
                    ]
                ]));
            },

            /**
             * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
             * @function
             * @private
             * @name _isElement
             * @param {jQuery} [element] Элемент.
             * @returns {Boolean} Флаг наличия.
             */
            _isElement: function (element) {
                return element && element[0] && element.find('.hotel__arrow')[0];
            }
        }),

        // Создание вложенного макета содержимого балуна.
        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="hotel__photo hotel__photo--card hotel__photo--all-hotels hotel__photo--balloon"><img\n' +
            '                                src="$[properties.balloonImage]"/></div>\n' +
            '                        <div class="hotel__content hotel__content--card hotel__content--all-hotels hotel__content--balloon">\n' +
            '                            <div class="hotel__stars stars stars--five stars--all-hotels"></div>\n' +
            '                            <div class="hotel__title hotel__title--card hotel__title--all-hotels"><span>$[properties.balloonTitle]</span>\n' +
            '                            </div>\n' +
            '                            <address class="hotel__address hotel__address--card hotel__address--all-hotels">$[properties.balloonAddress]' +
            '                            </address>\n' +
            '                            <ul class="hotel__benefits hotel__benefits--card hotel__benefits--all-hotels">\n' + '{% for benefit in properties.balloonBenefits %}' +
            '                                <li class="hotel__benefit hotel__benefit--card hotel__benefit--all-hotels">\n' +
            '                                    <span>{{ benefit }}</span></li>\n' + '{% endfor %}' +
            '                            </ul>\n' +
            '                            <a class="hotel__phone hotel__phone--card hotel__phone--all-hotels" href="$[properties.balloonPhoneHref]">$[properties.balloonPhone]</a>\n' +
            '                            <div class="hotel__info-container hotel__info-container--all-hotels">\n' +
            '                                <div class="hotel__score hotel__score--card hotel__score--all-hotels score score--all-hotels">\n' +
            '                                    <div class="score__number score__number--green"><span>$[properties.balloonScoreValue]</span></div>\n' +
            '                                    <p>$[properties.balloonScoreText]</p></div>\n' +
            '                                <div class="hotel__price hotel__price--card hotel__price--all-hotels">от $[properties.balloonPrice]</div>\n' +
            '                            </div>\n' +
            '                        </div>\n'
        );

    var MarkLayout = ymaps.templateLayoutFactory.createClass([
        '<ymaps class="mark">',
        '<ymaps class="mark__label"><span>{{ properties.iconContent|raw }}</span></ymaps>',
        '<ymaps class="mark__pin"/>',
        '</ymaps>'
    ].join(''), {
        getShape: function () {
            var element = $('.mark', this.getParentElement());
            var width = element[0].offsetWidth;
            var height = element[0].offsetHeight;
            var position = element.position();

            return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                [position.left, position.top],
                [position.left + width, position.top + height]
            ]));
        }
    });

    $.getJSON('/js/hotel__card--all-hotels.json', function (data) {

        $.each(data, function (key, val) {
            var coordinate = val.coordinate;
            var imageSrc = val.imageSrc;
            var title = val.title;
            var address = val.address;
            var benefits = val.benefits;
            var phone = val.phone;
            var phoneHref = "tel:" + parseInt(val.phone.replace(/\D+/g, ""));
            var score = val.score;
            var textScore = val.textScore;
            var price = val.price;

            // Создание метки с пользовательским макетом балуна.
            placemark = new ymaps.Placemark(coordinate, {
                balloonImage: imageSrc,
                balloonTitle: title,
                balloonAddress: address,
                balloonBenefits: benefits,
                balloonPhone: phone,
                balloonPhoneHref: phoneHref,
                balloonScoreValue: score,
                balloonScoreText: textScore,
                balloonPrice: price,
                iconContent: price
            }, {
                balloonShadow: false,
                balloonLayout: MyBalloonLayout,
                balloonContentLayout: MyBalloonContentLayout,
                balloonPanelMaxMapArea: 0,
                iconLayout: MarkLayout,
                // Не скрываем иконку при открытом балуне.
                // hideIconOnBalloonOpen: false,
                // И дополнительно смещаем балун, для открытия над иконкой.
                balloonOffset: [0, -70]
            });

            mapAllHotels.geoObjects.add(placemark);

        })
    })
}


//------------INDEX---------------//

//Entry
$('.header__button--entry').on('click', function () {
    $('.popup--cabinet').addClass('active');
    $('.popup__form--cabinet').addClass('active')
    scrollLock.hide();
})
//Register
$('.form__button--call-registration').on('click', function () {
    $('.popup__form--cabinet').removeClass('active');
    $('.popup__form--registration').addClass('active');
})
//Forgot
$('.form__forgot').on('click', function () {
    $('.popup__form--cabinet').removeClass('active');
    $('.popup__form--forgot').addClass('active');
})

//Button close
$('.button--close').on('click', function () {
    $(this).closest('.form').removeClass('active');
    $(this).closest('.popup').removeClass('active');

    if (!($('.header').hasClass('open-menu'))) {
        scrollLock.show();
    }
})
//Close for click on popup and press 'Esc'
$('.popup').click(function (e) {
    var $popup = $('.popup');
    console.log(e)

    if ($(e.target).hasClass('popup')) {
        $popup.find('.active').removeClass('active');
        $popup.removeClass('active');
        scrollLock.show();
    }
    window.addEventListener('keyup', function (e) {
        if (e.keyCode === 27) {
            $popup.find('.active').removeClass('active');
            $popup.removeClass('active');
            scrollLock.show();
        }
    })
});


//------------HOTEL-PAGE---------------//


//Открываем карту
$('.location__button--map').on('click', function () {
    var location = $('.location');
    location.addClass('active-map');
    location.removeClass('active-panorama');
})

$('.location__button--panorama').on('click', function () {
    var location = $('.location');
    location.addClass('active-panorama');
    location.removeClass('active-map');
})

//Закрыть карту на мобиле
$('.location__button--back').on('click', function () {
    var location = $('.location');
    if (location.hasClass('active-map')) {
        location.removeClass('active-map');
    } else {
        location.removeClass('active-panorama');
    }

})

$('.hotel__button--more-services').on('click', function () {
    var icons = $('.hotel__icons');
    icons.toggleClass('active');
    console.log($('.hotel__small-info').width())
    if (icons.hasClass('active')) {
        // icons.data('width', icons.width());
        // icons.css('max-width', icons[0].scrollWidth);

        // if (icons[0].scrollWidth >= $('.hotel__small-info').width()) {
        //     icons.css('white-space','normal');
        //     icons.css('max-width', $('.hotel__small-info').width())
        // }

        icons.data('height', icons.height());
        icons.css('max-height', icons[0].scrollHeight);
    } else {
        icons.css('max-height', icons.data('height'));
        // icons.css('white-space','nowrap');

        // if ($(document).width() < 768) {
        //     icons.css('max-width', 175);
        // } else {
        //     icons.css('max-width', 200);
        // }
    }

})

//form-booking Counter
$('.form-booking__button--increment').on('click', function () {
    var count = $(this).closest('.form-booking__counter').find('.form-booking__count');
    var price = $(this).closest('.form-booking__line').find('.form-booking__price');
    var valueCount = parseInt(count.html());
    var valuePrice = parseInt(price.html());

    valuePrice += valuePrice / valueCount;
    valueCount++;
    count.html(valueCount);
    price.html(valuePrice);
})

$('.form-booking__button--decrement').on('click', function () {
    var count = $(this).closest('.form-booking__counter').find('.form-booking__count');
    var price = $(this).closest('.form-booking__line').find('.form-booking__price');
    var valueCount = parseInt(count.html());
    var valuePrice = parseInt(price.html());

    if (valueCount > 1) {
        valuePrice -= valuePrice / valueCount;
        valueCount--;
        count.html(valueCount);
        price.html(valuePrice);
    }
})

//POPup form-booking
$('.marketing__button--reserved,.room__button--reserved').on('click', function () {
    var formBooking = $('#form-booking');

    formBooking.addClass('darken');
    scrollLock.hide();
})

$('.promo').on('click',function (e) {
    var $popup = $('.hotel__promo');

    if($(e.target).hasClass('darken')) {
        $popup.removeClass('darken');
        scrollLock.show();
    }
})

$('.form-booking__button--close').on('click', function () {
    $(this).closest('.promo').removeClass('darken');
    scrollLock.show();
})

//POPup for photos preview and slider hotel
$('.hotel__image, .hotel__slide').on('click', function () {
    $('.hotel__slider').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        gallery: {
            enabled: true
        }
    }).magnificPopup('open');
});

//POPup для картинокв слайдере Room
$('.room__slide').on('click', function () {
    $($(this).closest('.room__slider')).magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        image: {
            verticalFit: true,
            titleSrc: 'title'
        },
        gallery: {
            enabled: true
        }
    });
});

//Toggle room mobile
var hotelMobileTableSlider = new Swiper('.room__table--mobile', {
    init: false,
    spaceBetween: 15,
    sliderPreview: 'auto'
});

$('.room__toggle').on('click', function () {
    $(this).closest('.room__dropdown').toggleClass('active');
    hotelMobileTableSlider[$(this).closest('.room').index()].init()
})

$('.room__button--more').on('click', function () {
    var text = $(this).closest('.room__text').find('p').html();

    $(this).magnificPopup({
        items: {
            src: '<div class="white-popup text--page">' + text + '</div>',
            type: 'inline'
        },
        closeBtnInside: true
    });
})

//feedbacks
$('.feedbacks__wrapper').masonry({
    // options...
    itemSelector: '.feedbacks__item',
    columnWidth: 20,
    gutter: 28
    // percentPosition: true
});

//Кнопка подробнее об отеле
$('.about-hotel__button').on('click', function () {
        //Что скрываем
        if ($(this).html() === 'скрыть') {
            $(this).html('Подробнее об отеле')
            $('.about-hotel__text').removeClass('active');
        } else {
            $('.about-hotel__text').addClass('active');
            $(this).html('скрыть')
        }
})

//Вешаем классы active по клику кнопок
$('.room__button--variants').on('click', function () {
    var room = $(this).closest('.room');
    var roomTable = room.find('.room__options');
    roomTable.addClass('active');

    if (roomTable.outerHeight() > room.innerHeight()) {
        room.css('margin-bottom', roomTable.outerHeight() - room.innerHeight());
    } else {
        roomTable.css('height', room.innerHeight());
    }
})
//
// $('.room__button--choose').on('click',function () {
//     var room = $(this).closest('.room');
//     var roomTable = room.find('.room__options');
//
//    roomTable.addClass('active');
//
//     if (roomTable.outerHeight() > room.innerHeight()) {
//         room.css('margin-bottom', roomTable.outerHeight() - room.innerHeight());
//     } else {
//         roomTable.css('height', room.innerHeight());
//     }
// })

//Свернуть таблицу с ценами
$('.room__button--close-table').on('click', function () {
    $(this).closest('.room__options').removeClass('active');
    $(this).closest('.room').css('margin-bottom', 0);
})


//------------ALL-HOTELS---------------//

//Change buttons view
$('.view input').on('change', function (e) {
    var el = $('input[name=view]:checked', '.view').val();
    var allHotels = $('.all-hotels');

    if (el === "view-one") {
        allHotels.removeClass('all-hotels--map').removeClass('all-hotels--two');
        allHotels.addClass('all-hotels--one');
    } else if (el === "view-two") {
        allHotels.removeClass('all-hotels--map').removeClass('all-hotels--one');
        allHotels.addClass('all-hotels--two');
    } else {
        allHotels.removeClass('all-hotels--two').removeClass('all-hotels--one');
        allHotels.addClass('all-hotels--map');
    }
})

$('.hotels-cards__button--filter').on('click', function () {
    $('.filter').addClass('active');
    $('.hotels-cards').addClass('darken');
    scrollLock.hide();
})

$('.all-hotels__hotels').click(function (e) {
    var $popup = $('.hotels-cards');
    if ($('.filter').hasClass('active')) {
        if ($(e.target).hasClass('darken')) {
            $popup.removeClass('darken');
            $('.filter').removeClass('active');
            scrollLock.show();
        }
    }
});

$('.filter__button--close').on('click',function () {
    $('.filter').removeClass('active');
    $('.hotels-cards').removeClass('darken');
    scrollLock.show();
})



$(document).ready(function () {
    if ($('div').is('#all-hotels')) {
        $('.header').removeAttr('class').addClass('header header--blue header--mobile-logo header--mobile-blue')
        $('.header__container').addClass('header__container--max')
        $('.nav__sublist').addClass('nav__sublist--max')
        $('.nav__tools').addClass('nav__tools--max')

        //Заполнение карточек отелей в all-hotels
        $.getJSON('/js/hotel__card--all-hotels.json', function (data) {
            var arr =[];
            $.each(data, function (key, val) {
                var imageSrc = val.imageSrc;
                var title = val.title;
                var address = val.address;
                var benefits = val.benefits;
                var benefitsItems = '';
                for (var i = 0; i < 3; i++) {
                    benefitsItems += '<li class="hotel__benefit hotel__benefit--card hotel__benefit--all-hotels"><span>' + benefits[i] + '</span></li>'
                }

                var phone = val.phone;
                var phoneHref = "tel:" + parseInt(val.phone.replace(/\D+/g, ""));
                var score = val.score;
                var textScore = val.textScore;
                var price = val.price;
                var layout ='<div class="hotel__photo hotel__photo--card hotel__photo--left hotel__photo--all-hotels">\n' +
                    '                                <img src="' + imageSrc + '"/></div>\n' +
                    '                            <div class="hotel__content hotel__content--card hotel__content--right hotel__content--all-hotels">\n' +
                    '                                <div class="hotel__stars stars stars--five stars--all-hotels"></div>\n' +
                    '                                <div class="hotel__title hotel__title--card hotel__title--all-hotels"><span>' + title + '</span>\n' +
                    '                                </div>\n' +
                    '                                <address class="hotel__address hotel__address--card hotel__address--all-hotels">\n' +
                    '                                    <span>' + address + '</span>\n' +
                    '                                </address>\n' +
                    '                                <ul class="hotel__benefits hotel__benefits--card hotel__benefits--all-hotels">\n' + benefitsItems +
                    '                                </ul>\n' +
                    '                                <a class="hotel__phone hotel__phone--card hotel__phone--all-hotels"\n' +
                    '                                   href="' + phoneHref + '"><span>' + phone + '</span></a>\n' +
                    '                                <div class="hotel__info-container hotel__info-container--all-hotels">\n' +
                    '                                    <div class="hotel__score hotel__score--card hotel__score--all-hotels score score--all-hotels">\n' +
                    '                                        <div class="score__number score__number--green"><span>' + score + '</span></div>\n' +
                    '                                        <p>' + textScore + '</p></div>\n' +
                    '                                    <div class="hotel__price hotel__price--card hotel__price--all-hotels">' + price + '</div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n';
                // $(layout).wrap('<div></div>');
                // console.log($(layout))
                // $('.hotels-cards__list--real').append(layout);
                arr.push(layout)
            })
            var list = document.getElementById('cards-list');

            for (var i = 0; i < arr.length; i++) {
                var a = document.createElement("a");
                $(a).attr({
                    href: '#',
                    class: 'hotels-cards__item hotels-cards__item--half hotel hotel--card hotel--all-hotels'
                })
                a.innerHTML = arr[i];
                list.appendChild(a);
            }
        })

        initFilterGraph();

        if ($(document).width() >= 768) {
            $('.footer').addClass('none');
        }

        // var choose1 = 0;
        // var choose2 = 0;
        // //выбираем несколько чекбоксов
        // $('.score-field__radio input').on('click',function () {
        //     var allCheckbox = $(this).closest('.score-field').find('.score-field__radio');
        //
        //
        //     if ($(this).closest('.score-field__radio').hasClass('choose1')) {
        //         $(this).closest('.score-field__radio').removeClass('choose1');
        //         choose1 = 0
        //
        //     } else if ($(this).closest('.score-field__radio').hasClass('choose2')) {
        //         $(this).closest('.score-field__radio').removeClass('choose2')
        //         choose2 = 0
        //
        //     } else {
        //         if (!($(this).is('checked'))) {
        //             if (checkScoreField(allCheckbox, 'choose1','choose2')) {
        //                 if (choose2 === 0) {
        //                     $(this).closest('.score-field__radio').addClass('choose2')
        //                     choose2 = $(this).val();
        //                 }
        //             } else {
        //                 if (choose1 === 0) {
        //                     $(this).closest('.score-field__radio').addClass('choose1')
        //                     choose1 = $(this).val();
        //
        //                 }
        //             }
        //         }
        //     }
        //
        //     if (choose1 > 0 && choose2 > 0) {
        //         console.log('test')
        //         for (var i=0; i < allCheckbox.length; i++) {
        //             if (choose1 > $(allCheckbox[i]).find('input').val()) {
        //                 $(allCheckbox[i]).addClass('active');
        //                 // allCheckbox[i].find('input').attr('checked','checked');
        //             }
        //
        //             if (choose2 < $(allCheckbox[i]).find('input').val()) {
        //                 $(allCheckbox[i]).addClass('active');
        //                 // allCheckbox[i].find('input').attr('checked','checked');
        //             }
        //         }
        //     }
        // })
        //
        // function checkScoreField(arr,value, value2) {
        //     for (var i=0; i < arr.length; i++) {
        //
        //         if ($(arr[i]).hasClass(value) || $(arr[i]).hasClass(value2)) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }
        //
        //     return false;
        // }
    }

    if ($('div').is('#article-page')) {
        $('.header').removeAttr('class').addClass('header header--mobile-logo')
    }

    if ($('div').is('#blog')) {
        $('.header').removeAttr('class').addClass('header header--blue header--mobile-logo header--mobile-logo header--mobile-blue')
    }

    if ($('div').is('#hotels')) {
        //Заполнение карточек отелей в Hotels
        $.getJSON('/js/hotel__card--all-hotels.json', function (data) {
            var arr =[];
            $.each(data, function (key, val) {
                var imageSrc = val.imageSrc;
                var title = val.title;
                var address = val.address;
                var benefits = val.benefits;
                var benefitsItems = '';
                for (var i = 0; i < 3; i++) {
                    benefitsItems += '<li class="hotel__benefit hotel__benefit--card hotel__benefit--all-hotels"><span>' + benefits[i] + '</span></li>'
                }

                var phone = val.phone;
                var phoneHref = "tel:" + parseInt(val.phone.replace(/\D+/g, ""));
                var score = val.score;
                var textScore = val.textScore;
                var price = val.price;
                var layout ='<div class="hotel__photo hotel__photo--card">\n' +
                    '                                <img src="' + imageSrc + '"/></div>\n' +
                    '                            <div class="hotel__content hotel__content--card">\n' +
                    '                                <div class="hotel__stars stars stars--five"></div>\n' +
                    '                                <div class="hotel__title hotel__title--card "><span>' + title + '</span>\n' +
                    '                                </div>\n' +
                    '                                <address class="hotel__address hotel__address--card">\n' +
                    '                                    <span>' + address + '</span>\n' +
                    '                                </address>\n' +
                    '                                <ul class="hotel__benefits hotel__benefits--card">\n' + benefitsItems +
                    '                                </ul>\n' +
                    '                                <a class="hotel__phone hotel__phone--card"\n' +
                    '                                   href="' + phoneHref + '"><span>' + phone + '</span></a>\n' +
                    '                                <div class="hotel__info-container">\n' +
                    '                                    <div class="hotel__score hotel__score--card score ">\n' +
                    '                                        <div class="score__number score__number--green"><span>' + score + '</span></div>\n' +
                    '                                        <p>' + textScore + '</p></div>\n' +
                    '                                    <div class="hotel__price hotel__price--card">' + price + '</div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n';
                // $(layout).wrap('<div></div>');
                // console.log($(layout))
                // $('.hotels-cards__list--real').append(layout);
                arr.push(layout)
            })
            var list = document.getElementById('hotels-slider');

            for (var i = 0; i < arr.length; i++) {
                var a = document.createElement("a");
                $(a).attr({
                    href: '#',
                    class: 'hotels__item hotel hotel--card'
                })
                a.innerHTML = arr[i];
                list.appendChild(a);
            }
        })
    }

    //SEARCH KeyPress
    if ($(document).width() >= 768) {
        $('body').on('keydown', '.search input', function(e) {
            var scoop = $(this).closest('.search'),
                results = scoop.find('.search__results'),
                result = results.find('.search__item'),
                count = result.length,
                href = $(this).closest('.search').find('.search__result.active .result__title').attr('href');
            if (countSearch < count) {
                if (event.keyCode === 40) {
                    countSearch++;
                    if (countSearch === count) {
                        countSearch = 0;
                    }
                }
                if (event.keyCode === 38) {
                    countSearch--;
                    if (countSearch < 0) {
                        countSearch = count - 1;
                    }
                }
                result.removeClass('active');
                result.eq(countSearch).addClass('active');
            }
            if (event.keyCode === 13) {
                if (href === undefined) {
                    return;
                }
                location.href = href;
            }
        });
    }

    $('.search__item').on('mouseover',function () {
        $('.search__item').removeClass('active');
        countSearch = -1;
    })

//------------ALL-HOTELS---------------//
// Input range distance
    var distanceInput = $('#distance-input');
    var rangeValue = $('.range-value');
    $( function() {
        distanceInput.slider({
            range: "min",
            min: 0,
            max: 10000,
            value: 500,
            step: 100,
            classes: {
                "ui-slider": "ui-slider",
                "ui-slider-handle": "ui-slider__handle",
                "ui-slider-range": "ui-slider__range"
            },
            slide: function (event, ui) {

                if (ui.value < 1000) {
                rangeValue.html(ui.value + 'м');
                } else {
                    rangeValue.html((ui.value / 1000).toFixed(1) + 'км');
                }
            }
        })

        rangeValue.html(distanceInput.slider("value") + 'м');
    });
//------------HOTEL-PAGE---------------//

//Слайдер room
    var hotelRoomSlider = new Swiper('.room__slider', {
        init: true,
        lazy: true,
        watchSlidesVisibility: true,
        spaceBetween: 0,
        loop: false,
        slidesPerView: 1,
        pagination: {
            el: '.room__dots',
            type: 'bullets',
            renderBullet: function (index, className) {
                return '<div class="room__dot dot ' + className + '"></div>';
            },
            bulletClass: 'dot--white',
            bulletActiveClass: 'dot--white-active',
            clickable: true
        },
        fadeEffect: {
            crossFade: true
        },
        effect: 'fade'
    });

//Слайдер hotels
    hotelPageSlider = new Swiper('.hotel__slider', {
        init: true,
        lazy: true,
        watchSlidesVisibility: true,
        spaceBetween: 10,
        loop: false,
        breakpoints: {
            767: {
                slidesPerView: 1,
                pagination: {
                    el: '.hotel__dots',
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        return '<div class="hotel__dot dot ' + className + '"></div>';
                    },
                    bulletClass: 'dot--white',
                    bulletActiveClass: 'dot--white-active',
                    clickable: true
                }
            }
        }
    });

    //Инфо "Как добраться" на мобиле
    if ($(document).width() < 1200) {
        $('.location__button--toggle').on('click', function () {
            $('.location__description').toggleClass('active');
        })
    }

    //Убираем имена у кнопок отображения
    if ($(document).width() >= 768) {
        $('.location__button--panorama').html('');
        $('.location__button--map').html('');
    }

    //Mobile marketing-line
    if ($(document).width() < 768) {
        timerID = setInterval(function () {
            var marketing = $('.marketing');
            if (marketing.hasClass('show')) {
                marketing.removeClass('show');
            } else {
                marketing.addClass('show');
            }
        }, 5000);
    } else {
        clearInterval(timerID);
        if ($('.marketing').hasClass('show')) {
            $('.marketing').removeClass('show');
        }
    }


    if ($('div').is('#hotel--page')) {
        //HEADER
        $('.header').removeAttr('class').addClass('header header--blue')

        if ($(document).width() < 768) {
            $('.hotel__link--map').on('click', function (e) {
                e.preventDefault();
                var location = $('.location');
                location.addClass('active-map');
                location.removeClass('active-panorama');
            })

            $('.hotel__link--panorama').on('click', function (e) {
                e.preventDefault();
                var location = $('.location');
                location.addClass('active-panorama');
                location.removeClass('active-map');
            })
            var hotelTitle = $('.hotel__title--page');
            if (hotelTitle.html().length >= 35) {
                hotelTitle.html(fixSymbols(hotelTitle.html(), 38));
            }
        }

        //Fixed navigation
        $(document).on('scroll', function () {
            if ($(window).width() >= 768) {
                fixNumbers();
            }

            if (position >= main.offset().top && position < (main.offset().top + main.outerHeight() - 100)) {
                $currentItem = $(item[0]);
                current();
            }

            if (position >= rooms.offset().top - 100 && position < rooms.offset().top + rooms.outerHeight() - 100) {
                $currentItem = $(item[1]);
                current();
            }

            if (position >= about.offset().top - 100 && position < about.offset().top + about.outerHeight() - 100) {
                $currentItem = $(item[2]);
                current();
            }

            if (position >= location.offset().top - 100 && position < location.offset().top + location.outerHeight() - 100) {
                $currentItem = $(item[3]);
                current();
            }

            if (position > feedbacks.offset().top - 100 && position < feedbacks.offset().top + feedbacks.outerHeight() - 100) {
                $currentItem = $(item[4]);
                current();
            }
        });
    }

//------------GENERAL---------------//
    //Datepicker
    $('[data-toggle="datepicker"]').datepicker({
        autoHide: true,
        format: 'dd.mm.yyyy',
        language: 'ru-RU'
    });

    //Custom scroll
    if ($(document).width() >= 768) {
        $('.custom-scroll').customScroll({
            vertical: true,
            horizontal: false,
            /* vertical */
            barMinHeight: 10,
            offsetTop: 0,
            offsetBottom: 0,
            trackWidth: 10
        })
    }

    //Init maps
    if ($('div').is("#map")) {
        ymaps.ready(initMap);
        ymaps.ready(initPanorama);
    } else if ($('div').is("#map-allHotels")) {
        ymaps.ready(initMapAllHotels);
    }

    getVarsForFixed();
})

$(window).on('resize', function () {
    if ($('div').is('.darken')) {
        if ($(window).width() > 768) {
            $('.filter').removeClass('active');
            $('.hotels-cards').removeClass('darken');
            scrollLock.show();
        }
    }

    if ($('div').is('#all-hotels')) {
        if ($(window).width() > 768) {
            $('.footer').addClass('none')
        } else {
            $('.footer').removeClass('none')
        }
    }

    if ($('header').hasClass('open-menu')) {
        if ($(window).width() > 768) {
            $('.header').removeClass('open-menu');
            $('.button--hamburger').removeClass('active');
            scrollLock.show();
        }
    }

    if ($('div').is('#hotel--page')) {
    //Mobile marketing-line
    if ($(window).width() < 768) {
        //Секци маркетинг
        // timerID = setInterval(function () {
        //     var marketing = $('.marketing');
        //     if (marketing.hasClass('show')) {
        //         marketing.removeClass('show');
        //     } else {
        //         marketing.addClass('show');
        //     }
        // }, 5000);
        var hotelTitle = $('.hotel__title--page');
        if (hotelTitle.html().length >= 35) {
            hotelTitle.html(fixSymbols(hotelTitle.html(), 38));
        }

        //для списка сайдбара задание максимальной высоты
        $('.nav__list').css('max-height', window.innerHeight - $('.nav__list').offset().top);

        //Инициализация слайдера в шапке hotel--page
        hotelPageSlider.init();

    } else {
        clearInterval(timerID);
        if ($('.marketing').hasClass('show')) {
            $('.marketing').removeClass('show');
        }

        $('.hotel__title--page').html(hotelTitleText);
    }

        if ($(window).width() >= 1200) {
            getVarsForFixed();
            fixNumbers();
        }
    }

})

//Для REMов
function setHtmlFontSize() {
    var fontSize = window.innerWidth / 100;

    if (window.innerWidth >= 1400 && window.innerWidth < 1720) fontSize = 14;
    if (window.innerWidth >= 1720) fontSize = 17.2;
    document.documentElement.style.fontSize = fontSize + 'px';
}
//Для ползунка в навигации
function current() {
    $slideLine = $('.navigation__line');
    $(function() {
        if ($currentItem) {
            $slideLine.css({
                "width": $currentItem.outerWidth(),
                "left": $currentItem.position().left + parseInt($currentItem.css('margin-left'))
            });
        }
    });
}
//Переменные для фиксирования form-booking
function getVarsForFixed() {
    if ($('div').is('#hotel--page')) {
        navigation = $('.hotel__navigation');
        item = $('.navigation__item');
        main = $('#main');
        rooms = $('#rooms');
        about = $('#about-hotel');
        location = $('#location');
        feedbacks = $('#feedbacks');
        formBooking = $('.form-booking');
        hotelLeft = $('.hotel__left');
        hotelTitle = $('.hotel__title');
        hotelTitleText = $('.hotel__title').html();
        hotelLeftPosition = hotelLeft.offset().top + hotelLeft.outerHeight() - formBooking.outerHeight() - navigation.outerHeight();
        formBookingStart = formBooking.offset().top - navigation.outerHeight();
        formBookingWidth = formBooking.outerWidth();
        formBookingPositionLeft = formBooking.offset().left;
    }
}
//Построение графика в секции filter на all-hotels(передать массив цен)
function initFilterGraph() {
    var price = [2515,3132,4578,9456,48787,5555,17000,12345,78549,46789,13345,78979,13456,7875,6787,121222,33334,44445,54789,33345,5489,7894,55567,2000,1000,5647,9517,6547,8965,2378,99525];
    var length = price.length;
    var maxPrice = price[0];
    var minPrice = price[0];
    var delta = 0;
    var rangesCount = [];
    var spans = 36;
    var graphic = $('.filter__graphic');

    for (var i=0; i < length; i++) {
        if (price[i] > maxPrice) {
            maxPrice = price[i]
        } else if (price[i] < minPrice) {
            minPrice = price[i]
        }
    }

    delta = (maxPrice - minPrice)/spans;
    for (var i=0; i < spans; i++) {
        rangesCount[i] = 0;
    }

    for (var i=0; i < spans; i++) {
        var start = minPrice + delta * i;
        var finish = minPrice + delta * (i+1);

        for (var j=0; j < length; j++) {
            if (price[j] >= start && price[j] <=finish) {
                rangesCount[i]++;
            }
        }
    }
    var rangesCountMax = rangesCount[0];

    for (var i=0; i < rangesCount.length; i++) {
        if (rangesCount[i] > rangesCountMax) {
            rangesCountMax = rangesCount[i];
        }
    }

    for (var i=0; i < rangesCount.length; i++) {
        var span = '<span style="transform: scaleY(' + rangesCount[i]/rangesCountMax + ')"></span>';

        graphic.append(span);
    }

    var priceInput = $('#price-input');
    $( function() {
        priceInput.slider({
            range: true,
            min: minPrice,
            max: maxPrice,
            values: [ minPrice, maxPrice ],
            step: 100,
            classes: {
                "ui-slider": "ui-slider",
                "ui-slider-handle": "ui-slider__handle",
                "ui-slider-range": "ui-slider__range"
            },
            slide: function( event, ui ) {
                valueTo.html('от ' + ui.values[1]);
                        valueFrom.html('до ' + ui.values[0]);
                        $('.filter__graphic span').removeClass('disabled');

                        for (var i=0; i < spans; i++) {
                            var start = minPrice + delta * i;
                            var finish = minPrice + delta * (i+1);

                            for (var j=0; j < length; j++) {
                                if (ui.values[0] > start || ui.values[1] < finish) {

                                    $($('.filter__graphic span')[i]).addClass('disabled');
                                }
                            }
                        }
            }
        });
        valueFrom.html(priceInput.slider("values", 0));
        valueTo.html(priceInput.slider("values", 1));
    } );

    // $(".price-input").ionRangeSlider({
    //     skin: "price",
    //     type: "double",
    //     min: minPrice,
    //     max: maxPrice,
    //     from: minPrice,
    //     to: maxPrice,
    //     step: 100,
    //
    //     onStart: function (data) {
    //         valueTo.html('от ' + data.to);
    //         valueFrom.html('до ' + data.from);
    //     },
    //     onChange: function (data) {
    //         valueTo.html('от ' + data.to);
    //         valueFrom.html('до ' + data.from);
    //         $('.filter__graphic span').removeClass('disabled');
    //
    //         for (var i=0; i < spans; i++) {
    //             var start = minPrice + delta * i;
    //             var finish = minPrice + delta * (i+1);
    //
    //             for (var j=0; j < length; j++) {
    //                 if (data.from > start || data.to < finish) {
    //
    //                     $($('.filter__graphic span')[i]).addClass('disabled');
    //                 } else {
    //
    //                 }
    //             }
    //         }
    //     }
    // });
}
//Фиксирование form-booking
function fixNumbers() {
    position = $(document).scrollTop();
    if (position >= 400) {
        navigation.addClass('active');
    } else {
        navigation.removeClass('active');
    }
    if (position >=  formBookingStart) {
        formBooking.css({
            'position' : 'fixed',
            'width' : formBookingWidth,
            'top' : navigation.outerHeight() + 24,
            'left' : formBookingPositionLeft
        });

        if (position > hotelLeftPosition) {
            formBooking.css({
                'position' : 'absolute',
                'top' : hotelLeft.outerHeight() - formBooking.outerHeight(),
                'left' : formBookingPositionLeft - $('.hotel__wrapper').offset().left
            });
        }
    } else {
        formBooking.removeAttr('style');
    }
}
//Ограничиваем количество символов
function fixSymbols(str,val) {
    if (str.length >= val) {
        str=str.split('');
        str=str.slice(0,val);
        str.push('...');
        str=str.join('');
    }
    return str;
}

