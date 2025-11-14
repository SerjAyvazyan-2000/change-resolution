

jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchstart", handle, { passive: false });
  },
};

jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchmove", handle, { passive: false });
  },
};


$(function () {
  let Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;
    let links = this.el.find(".link");
    links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    let $el = e.data.el;
    let $this = $(this),
      $next = $this.next();

    $next.slideToggle();

    if (!e.data.multiple) {
      $el.find(".submenu").not($next).slideUp();
    }

    if (!$this.hasClass("open")) {
      $(".link").removeClass("open");
      $this.addClass("open");
    } else {
      $this.removeClass("open");
    }
  };

  let accordion = new Accordion($("#accordion"), false);

  let firstLink = $("#accordion .link").first();
  let firstSub = firstLink.next(".submenu");

  firstLink.addClass("open");
  firstSub.show();
});

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

 
});






let reviewsSwiper;
let currentDirection;

function initSwiper() {
  const isMobile = window.innerWidth <= 992;
  const direction = isMobile ? "horizontal" : "vertical";

  if (reviewsSwiper && currentDirection === direction) return;

  if (reviewsSwiper) reviewsSwiper.destroy(true, true);

  currentDirection = direction;

  reviewsSwiper = new Swiper(".reviews__swiper", {
    direction,
    loop: true,
    speed: isMobile ? 600 : 5500,

    autoplay: !isMobile && {
      delay: 0,
      disableOnInteraction: false,
    },

    allowTouchMove: isMobile,

    slidesPerView: 3,
    spaceBetween: 10,

    pagination: {
      el: ".reviews__pagination",
      clickable: true,
    },

    breakpoints: {
      320: { slidesPerView: 1 },
      576: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
    },
  });

  const wrapper = document.querySelector(".reviews__swiper");
  wrapper.onmouseenter = () => !isMobile && reviewsSwiper.autoplay?.stop?.();
  wrapper.onmouseleave = () => !isMobile && reviewsSwiper.autoplay?.start?.();
}

window.addEventListener("load", initSwiper);
window.addEventListener("resize", () => {
  clearTimeout(window._resizeTimer);
  window._resizeTimer = setTimeout(initSwiper, 250);
});

let swiperWhy = null

function initSwipers() {
    const width = window.innerWidth

    if (width <= 1024 && !swiperWhy) {
        swiperWhy = new Swiper('.why__swiper', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            pagination: {
                el: '.why__pagination',
                clickable: true,
            },
        })
    } else if (width > 1024 && swiperWhy) {
        swiperWhy.destroy(true, true)
        swiperWhy = null
    }

}

initSwipers()

window.addEventListener('resize', () => {
    initSwipers()
})


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
