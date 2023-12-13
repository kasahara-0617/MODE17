/* --------------------------------
 *  Decrease Display Magnification
 * -------------------------------- */
const adjustViewport = (triggerWindowWidth = 370) => {
  const metaViewport = document.querySelector('meta[name="viewport"]');
  const viewportValue =
    window.outerWidth < triggerWindowWidth
      ? `width=${triggerWindowWidth}, user-scalable=no, target-densitydpi=device-dpi`
      : "width=device-width, initial-scale=1";
  metaViewport.setAttribute("content", viewportValue);
};

window.addEventListener("DOMContentLoaded", () => {
  adjustViewport(); // 引数に画面幅の数値を与えると、その値が画面幅が縮小される起点になる
});

/* --------------------------------
 *  Disable Empty a Tag
 * -------------------------------- */
const anchorElements = document.querySelectorAll('a[href=""]');
anchorElements.forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    alert("リンク先がありません");
  });
});

/* --------------------------------
 *  Unify Width
 * -------------------------------- */
function unifyWidth(elements) {
  let maxWidth = 0;
  elements.forEach(function (element) {
    const width = element.offsetWidth;
    if (width > maxWidth) {
      maxWidth = width;
    }
  });

  elements.forEach(function (element) {
    element.style.width = `${maxWidth}px`;
  });
}

window.addEventListener("load", function () {
  const textElements = document.querySelectorAll(".js-text");
  unifyWidth(textElements);

  const teamElements = document.querySelectorAll(".js-team");
  unifyWidth(teamElements);
});

/* --------------------------------
 *  Scroll Animation
 * -------------------------------- */
window.addEventListener(
  "load",
  function () {
    // IntersectionObserverの作成
    const observer = new IntersectionObserver(
      function (entries) {
        for (let i = 0; i < entries.length; i++) {
          // 領域内なら処理を実行
          if (entries[i].intersectionRatio <= 0) continue;
          showElm(entries[i].target);
        }
      },
      {
        rootMargin: "-10% 0% -10% 0%",
      }
    );

    // 監視対象の追加
    const elements = document.querySelectorAll(".js-fadeIn");
    for (let i = 0; i < elements.length; i++) {
      observer.observe(elements[i]);
    }

    // 領域内に入ったとき実行する処理
    function showElm(e) {
      e.classList.add("view");
      observer.unobserve(e);
    }
  },
  false
);

const targetPhilosophy = document.querySelectorAll(
  ".js-eachTrigger-philosophy"
);
targetPhilosophy.forEach((target) => {
  gsap.fromTo(
    target.querySelectorAll(".js-eachFadeIn"),
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: { each: 0.1 },
      scrollTrigger: {
        trigger: target,
        start: "top center",
      },
    }
  );
});

const targetSdg = document.querySelectorAll(".js-eachTrigger-sdg");
targetSdg.forEach((target) => {
  gsap.fromTo(
    target.querySelectorAll(".js-eachFadeIn"),
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: { each: 0.1 },
      scrollTrigger: {
        trigger: target,
        start: "top center",
      },
    }
  );
});

const targetAccess = document.querySelectorAll(".js-eachTrigger-access");
targetAccess.forEach((target) => {
  gsap.fromTo(
    target.querySelectorAll(".js-eachFadeIn"),
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: { each: 0.1 },
      scrollTrigger: {
        trigger: target,
        start: "bottom top",
      },
    }
  );
});

/* --------------------------------
 *  Logo Animation
 * -------------------------------- */
new Vivus("js-logo", {
  type: "scenario-sync",
  start: "autostart",
  pathTimingFunction: Vivus.EASE_OUT,
  forceRender: false,
});

/* --------------------------------
 *  Parallax
 * -------------------------------- */
const targets1 = document.querySelectorAll(".js-parallax1");
targets1.forEach((target) => {
  gsap.fromTo(
    target.querySelector("img"),
    {
      yPercent: 12,
    },
    {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );
});

const targets2 = document.querySelectorAll(".js-parallax2");
targets2.forEach((target) => {
  gsap.fromTo(
    target.querySelector("img"),
    {
      yPercent: 12,
    },
    {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        start: "top+=600 bottom",
        end: "bottom+=600 top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );
});

const targetsText1 = document.querySelectorAll(".js-parallaxText1");
targetsText1.forEach((target) => {
  gsap.fromTo(
    target.querySelector("p"),
    {
      y: 60,
    },
    {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        start: "top+=600 bottom",
        end: "bottom+=600 top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );
});

const targetsText2 = document.querySelectorAll(".js-parallaxText2");
targetsText2.forEach((target) => {
  gsap.fromTo(
    target.querySelector("p"),
    {
      y: 60,
    },
    {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        start: "top+=600 bottom",
        end: "bottom+=600 top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );
});

/* --------------------------------
 *  Circle Fit Size & Rotate
 * -------------------------------- */
const circleOuter = document.querySelector(".js-circle");
const circleImages = document.querySelectorAll(".js-circleImg");

const firstCircleImage = circleImages[0];

const circleHeight = firstCircleImage.clientHeight;

circleOuter.style.height = circleHeight * 1.3 + "px";

window.addEventListener("scroll", function () {
  let angle = window.scrollY * 0.2;

  circleImages.forEach(function (logo, index) {
    if (index === 1) {
      logo.style.transform = "rotate(" + -angle + "deg)";
    } else {
      logo.style.transform = "rotate(" + angle + "deg)";
    }
  });
});

/* --------------------------------
 *  SVG Animation
 * -------------------------------- */
new Vivus(
  "js-sdg-nine",
  {
    type: "sync",
    duration: 150,
    start: "inViewport",
    pathTimingFunction: Vivus.EASE_OUT,
    forceRender: false,
  },
  function (obj) {
    obj.el.classList.add("draw");
  }
);

new Vivus(
  "js-sdg-eleven",
  {
    type: "sync",
    duration: 150,
    start: "inViewport",
    pathTimingFunction: Vivus.EASE_OUT,
    forceRender: false,
  },
  function (obj) {
    obj.el.classList.add("draw");
  }
);

new Vivus(
  "js-sdg-twelve",
  {
    type: "sync",
    duration: 150,
    start: "inViewport",
    pathTimingFunction: Vivus.EASE_OUT,
    forceRender: false,
  },
  function (obj) {
    obj.el.classList.add("draw");
  }
);

/* --------------------------------
 *  Side Scroll
 * -------------------------------- */
const listWrapper = document.querySelector(".js-wrapper");
const listElements = document.querySelector(".js-list");

gsap.to(listElements, {
  x: () => -(listElements.clientWidth - listWrapper.clientWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".process",
    start: "top top",
    end: () => `+=${listElements.clientWidth - listWrapper.clientWidth}`,
    scrub: true,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
});
