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
 *  Circle Images Fit Size & Rotate
 * -------------------------------- */
const circleOuter = document.querySelector(".js-circle");
const circleImages = document.querySelectorAll(".js-circleImg");

const firstCircleImage = circleImages[0];

const circleHeight = firstCircleImage.clientHeight;

circleOuter.style.height = circleHeight * 1.3 + "px";

window.addEventListener("scroll", function () {
  let angle = window.scrollY * 0.2;

  circleImages.forEach(function (logo) {
    logo.style.transform = "rotate(" + angle + "deg)";
  });
});
