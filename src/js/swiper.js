const swiper = new Swiper('.swiper-js', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 18,

  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 18,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 18,
    },

    1400: {
      slidesPerView: 4,
      spaceBetween: 18,
    },
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
});

var reviewSwiper = new Swiper('.reviews-swiper', {
  slidesPerView: 1,
  spaceBetween: 16,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  breakpoints: {
    //  >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 18,
    },

    //  >= 1200px
    1200: {
      slidesPerView: 3,
      spaceBetween: 28,
    },
  },
  pagination: {
    el: '.swiper-reviews-pagination',
    clickable: true,
  },
});
