$(document).ready(function ($) {

  // preloader
  // $(window).on('load', function () {
  //   $('#preloader-active').delay(450).fadeOut('slow');
  //   $('body').delay(250).css({
  //     'overflow': 'visible'
  //   });
  // });

  // Scroll Up
  $('#scroll-down').on("click", () => {
    $('body,html').animate({
      scrollTop: 800
    }, 600);
    return false;
  });

  /* 2. Sticky And Scroll UP */
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
      $(".header-sticky").removeClass("sticky-bar");
    } else {
      $(".header-sticky").addClass("sticky-bar");
    }
  });

  // burger
  $('.burger').on('click', () => {
    $('.burger-menu').toggleClass('burger-menu_active');
  })

  // tabs 1
  $('.menu__link').on('click', function (e) {
    let currTab = $(this).index();
    $('.menu__link').removeClass('menu__link_active');
    $(this).addClass('menu__link_active');
  });

  // tabs 2
  $('.shop__tab').on('click', function (e) {
    e.preventDefault();
    let currTab = $(this).index();
    $('.shop__tab').removeClass('shop__tab_active');
    $(this).addClass('shop__tab_active');
  });

  // tabs 3
  $('.size__item').on('click', function (e) {
    let currTab = $(this).index();
    $('.size__item').removeClass('size__item_active');
    $(this).addClass('size__item_active');
  });

  // tabs 4
  $('.color__item').on('click', function (e) {
    let currTab = $(this).index();
    $('.color__item').removeClass('color__item_active');
    $(this).addClass('color__item_active');
  });

  //tabs 5
  $('.pagination__btn').on('click', function (e) {
    let currTab = $(this).index();
    $('.pagination__btn').removeClass('pagination__btn_active');
    $(this).addClass('pagination__btn_active');
  });
});

// filter
function app() {
  const buttons = document.querySelectorAll('.shop__tab');
  const cards = document.querySelectorAll('.collection__link');

  function filter(category, items) {
    items.forEach((item) => {
      const isItemFiltered = !item.classList.contains(category);
      const isShowAll = category.toLowerCase() == 'all'
      if (isItemFiltered && !isShowAll) {
        item.classList.add('shop-animate');
      } else {
        item.classList.remove('hide');
        item.classList.remove('shop-animate');
      };
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const currentCategory = button.dataset.filter;
      filter(currentCategory, cards);
    });
  });

  cards.forEach((card) => {
    card.ontransitionend = function () {
      if (card.classList.contains('shop-animate')) {
        card.classList.add('hide');
      };
    };
  });
};
app();

// modal
const btnOpen = document.querySelectorAll('#open__btn'),
  btnClose = document.getElementById('close__btn'),
  btnCloseMini = document.getElementById('mini-close__btn'),
  modalValidate = document.querySelector('.modal'),
  modalMini = document.querySelector('.modal__mini'),
  overlay = document.getElementById('overlay'),
  overlayMini = document.getElementById('overlay1'),
  body = document.querySelector('body');
btnOpen.forEach(element => {
  element.addEventListener('click', () => {
    modalValidate.classList.add('modal_active');
    body.classList.add('body-overlay');
  })
});
const closeModal = () => {
  modalValidate.classList.remove('modal_active');
  body.classList.remove('body-overlay');
};
overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);
const openModalMini = () => {
  modalMini.classList.add('modal__mini_active');
};
const closeModalMini = () => {
  body.classList.remove('body-overlay');
  modalMini.classList.remove('modal__mini_active');
};
overlayMini.addEventListener('click', closeModalMini);
btnCloseMini.addEventListener('click', closeModalMini);

//validate

// $('[data-submit]').on('click', function (e) {
//   e.preventDefault();
//   $(this).parent('form').submit();
// })
$.validator.addMethod("regex",
  function (value, element, regexp) {
    const re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
  },
  "Please check your input."
);

/* Функция валидации и вывода сообщений */
function valEl(el) {
  el.validate({
    rules: {
      name: {
        required: true,
        regex: "[A-Za-z]{1,32}"
      },
      phoneNumber: {
        // digits : true,
        required: true,
        // minlength: 10,
        // maxlength: 11,
        regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
      },
      email: {
        required: true,
        email: true,
      }
    },
    messages: {
      name: {
        required: 'Поле обязательно для заполнения',
      },
      phoneNumber: {
        required: 'Поле обязательно для заполнения',
        regex: 'Телефон может содержать символы + - ()'
      },
      email: {
        required: 'Поле обязательно для заполнения',
        email: 'Неверный формат E-mail'
      },
      country: {
        required: 'Поле обязательно для заполнения',
        email: 'Неверный формат country'
      },
      city: {
        required: 'Поле обязательно для заполнения',
        email: 'Неверный формат city'
      },
      street: {
        required: 'Поле обязательно для заполнения',
        email: 'Неверный формат street'
      },
      house: {
        required: 'Поле обязательно для заполнения',
        email: 'Неверный формат house'
      },
      flat: {
        required: 'Поле обязательно для заполнения',
        email: 'Неверный формат house'
      }
    },

    /* Функция валидации и вывода сообщений */

    submitHandler: function (form) {
      const $form = $(form);
      const $formId = $(form).attr('id');
      switch ($formId) {
        // Если у формы id="goToNewPage" - делаем:
        case 'modal-form':
          $.ajax({
            // type: 'POST',
            // url: $form.attr('action'),
            // data: $form.serialize()
          })
            .done(function () {
              console.log('Success');
            })
            .fail(function () {
              console.log('Fail');
            })
            .always(function (response) {
              console.log('Always');
              $form.trigger('reset');
              closeModal();
              openModalMini();
            });
          break;
        default:
          $.ajax({
            // type: 'POST',
            // url: $form.attr('action'),
            // data: $form.serialize()
          })
            .done(function () {
              console.log('Success');
            })
            .fail(function () {
              console.log('Fail');
            })
            .always(function (response) {
              console.log('Always');
              $form.trigger('reset');
            });
      }
      return false;
    }
  });
};
// Запускаем механизм валидации форм, если у них есть класс .form-book
$('.contact-form').each(function () {
  valEl($(this));
});

$.each($('input.tel'), function (index, val) {
  $(this).attr('type', 'phoneNumber');
  $(this).focus(function () {
    $(this).inputmask('+38(999) 999 9999', {
      clearIncomplete: true, clearMaskOnLostFocus: true,
      "onincomplete": function () { maskclear($(this)); }
    });
    $(this).addClass('focus');
    $(this).parent().addClass('focus');
    $(this).parent().removeClass('err');
    $(this).removeClass('err');
  });
});

//Маски номеров телефонов
//'+7(999) 999 9999'
//'+38(999) 999 9999'
//'+375(99)999-99-99'
//'a{3,1000}' только буквы минимум 3
//'9{3,1000}' только цифры минимум 3

// slider

const prev = document.getElementById('prev'),
  next = document.getElementById('next'),
  slidesWrap = document.querySelectorAll('.slider'),
  slidesHeader = document.querySelectorAll('.preview__item'),
  slidesFooter = document.querySelectorAll('.team__slider'),
  slidesHeaderActiveClass = 'preview__item_active',
  slidesFooterActiveClass = 'team__slider_active',
  dots = document.querySelectorAll('.slider__dot');

let index = 0;

const activeSlide = (i, slides, className) => {
  for (slide of slides) {
    slide.classList.remove(className);
  }
  slides[i].classList.add(className);
};

const activeDot = i => {
  for (dot of dots) {
    dot.classList.remove('slider__dot_active');
  }
  dots[i].classList.add('slider__dot_active');
};

const prepareCurrentSlide = (ind, slides, className) => {
  activeSlide(ind, slides, className);
  activeDot(ind);
};

const nextSlide = (slides, className) => {
  if (index == slides.length - 1) {
    index = 0;
    prepareCurrentSlide(index, slides, className);
  } else {
    index++;
    prepareCurrentSlide(index, slides, className);
  };
};

const prevSlide = (slides, className) => {
  if (index == 0) {
    index = slides.length - 1;
    prepareCurrentSlide(index, slides, className);
  } else {
    index--;
    prepareCurrentSlide(index, slides, className);
  };
};

dots.forEach((item, indexDot) => {
  item.addEventListener('click', () => {
    index = indexDot;
    prepareCurrentSlide(index, slidesHeader, slidesHeaderActiveClass);
    clearInterval(interval);
  });
});

next.addEventListener('click', () => {
  nextSlide(slidesFooter, slidesFooterActiveClass);
});

prev.addEventListener('click', () => {
  prevSlide(slidesFooter, slidesFooterActiveClass);
});

const interval = setInterval(() => {
  nextSlide(slidesHeader, slidesHeaderActiveClass)
}, 3000);
