/* --------------------------------
 *  Vue Application
 * -------------------------------- */
// import {
//   createApp,
//   defineComponent,
// } from "https://unpkg.com/vue@3.2.4/dist/vue.esm-browser.prod.js";

// const Footer = defineComponent({
//   template: `
//         <footer id="footer">
//           <p class="copyright"><small>&copy;copyright</small></p>
//         </footer>
//       `,
// });

// const app = createApp({});
// app.component("the-footer", Footer);
// app.mount("#app");

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
 *  Logo Animation
 * -------------------------------- */
new Vivus("js-logo", {
  type: "scenario",
  duration: 50,
  start: "autostart",
});

/* --------------------------------
 *  Parallax
 * -------------------------------- */
const targets = document.querySelectorAll(".js-parallax");

targets.forEach((target) => {
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
        // markers: true,
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
        // markers: true,
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
    // markers: true,
  },
});
