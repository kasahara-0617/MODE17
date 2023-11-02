/* --------------------------------
*  Vue Application
* -------------------------------- */
import { createApp, defineComponent } from 'https://unpkg.com/vue@3.2.4/dist/vue.esm-browser.prod.js';

const Header = defineComponent({
  template: `
        <header id="header">
          <h1>TITLE</h1>
        </header>
      `
});

const Footer = defineComponent({
  template: `
        <footer id="footer">
          <p class="copyright"><small>&copy;copyright</small></p>
        </footer>
      `
});

const app = createApp({});
app.component('the-header', Header);
app.component('the-footer', Footer);
app.mount('#app');


/* --------------------------------
*  Decrease Display Magnification
* -------------------------------- */
const adjustViewport = (triggerWindowWidth = 370) => {
  const metaViewport = document.querySelector('meta[name="viewport"]');
  const viewportValue =
    window.outerWidth < triggerWindowWidth
      ? `width=${triggerWindowWidth}, user-scalable=no, target-densitydpi=device-dpi`
      : 'width=device-width, initial-scale=1';
  metaViewport.setAttribute('content', viewportValue);
};

window.addEventListener('DOMContentLoaded', () => {
  adjustViewport(); // 引数に画面幅の数値を与えると、その値が画面幅が縮小される起点になる
});
