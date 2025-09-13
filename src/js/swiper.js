import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const swiper = new Swiper('.swiper-js', {
  modules: [Navigation, Pagination],
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 18,
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },
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
    renderBullet: function (index, className) {
      return (
        '<button class="' +
        className +
        '">go to slide ' +
        (index + 1) +
        '</button>'
      );
    },
  },
});

var reviewSwiper = new Swiper('.reviews-swiper', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 16,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },
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
    renderBullet: function (index, className) {
      return (
        '<button class="' +
        className +
        '">go to slide ' +
        (index + 1) +
        '</button>'
      );
    },
  },
});
