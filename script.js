document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".menu-list-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const burger = document.querySelector(".burger");
  const headerMenu = document.querySelector(".header__wrapper");
  const menuLinks = headerMenu.querySelectorAll(".header__link");
  const menuBg = document.querySelector(".menu-bg");
  burger.addEventListener("click", function (e) {
    headerMenu.classList.toggle("active");
    burger.classList.toggle("active");
    menuBg.classList.toggle("active");
    document.body.classList.toggle("no-scrolling");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      headerMenu.classList.remove("active");
      burger.classList.remove("active");
      menuBg.classList.toggle("active");
      document.body.classList.remove("no-scrolling");
    });
  });

  menuBg.addEventListener("click", () => {
    burger.classList.remove("active");
    headerMenu.classList.toggle("active");
    menuBg.classList.remove("active");
    document.body.classList.remove("no-scrolling");
  });

  const faqList = document.querySelector(".faq__list");

  faqList.addEventListener("click", function (e) {
    if (e.target.closest(".faq__button")) {
      const item = e.target.closest(".faq__item");
      const isOpen = item.classList.contains("show");

      document.querySelectorAll(".faq__item.show").forEach((openItem) => {
        openItem.classList.remove("show");
      });

      if (!isOpen) {
        item.classList.add("show");
      }
    }
  });

 
});


let reviewsSwiper;
let currentDirection;

function initSwiper() {
  const direction = window.innerWidth <= 992 ? "horizontal" : "vertical";
  const isMobile = window.innerWidth <= 992; 

  if (reviewsSwiper && currentDirection === direction) return;

  if (reviewsSwiper) reviewsSwiper.destroy(true, true);

  currentDirection = direction;

  reviewsSwiper = new Swiper(".reviews__swiper", {
    direction,
    loop: true,
    speed: isMobile ? 600 : 5500, 

    autoplay: isMobile
      ? false 
      : {
          delay: 0,
          disableOnInteraction: false,
        },

    freeMode: isMobile
      ? false 
      : {
          enabled: true,
          momentum: false,
        },

    allowTouchMove: isMobile, 

    slidesPerView: 3,
    spaceBetween: 10,

    pagination: {
             el: ".reviews__pagination ",
      clickable: true,
    },

      breakpoints: {
      320: { slidesPerView: 1 },
      576: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
     
      992: { slidesPerView: 3 },
    },
  });

  const wrapper = document.querySelector(".reviews-swiper");

  wrapper.onmouseenter = () => !isMobile && reviewsSwiper.autoplay?.stop?.();
  wrapper.onmouseleave = () => !isMobile && reviewsSwiper.autoplay?.start?.();
}

window.addEventListener("load", initSwiper);
window.addEventListener("resize", () => {
  clearTimeout(window._resizeTimer);
  window._resizeTimer = setTimeout(initSwiper, 250);
});




















document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(
    ".fade-left, .fade-right, .fade-top, .fade-bottom"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
});
