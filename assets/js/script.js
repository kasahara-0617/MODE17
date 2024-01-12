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

          if (entries[i].intersectionRatio > 0) {
            initMatterJs();
            // 一度呼び出したら監視を停止する
            observer.unobserve(entries[i].target);
          }
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
const maxWidth = 1480;
const minWidth = 800;
const screenWidth = window.innerWidth;
let adjustedWidth;
if (screenWidth < 375) {
  adjustedWidth = maxWidth;
} else {
  adjustedWidth =
    maxWidth - (maxWidth - minWidth) * ((screenWidth - 375) / (1440 - 375));
}
const scrollStart = `top+=${adjustedWidth} bottom`;
const scrollEnd = `bottom+=${adjustedWidth} top`;

const ParallaxTargets = [
  {
    triggerClass: ".js-hero",
    childElements: "h1",
    yOffset: 0,
    reversedYOffset: -120,
    start: "bottom bottom",
    end: "bottom top",
  },
  {
    triggerClass: ".js-parallax1",
    childElements: "img",
    yOffset: 12,
    reversedYOffset: -12,
    start: "top bottom",
    end: "bottom top",
  },
  {
    triggerClass: ".js-parallaxText1",
    childElements: "p",
    yOffset: 100,
    reversedYOffset: -150,
    start: "top+=600 bottom",
    end: "bottom+=600 top",
  },
  {
    triggerClass: ".js-parallax2",
    childElements: "img",
    yOffset: 12,
    reversedYOffset: -12,
    start: scrollStart,
    end: scrollEnd,
  },
  {
    triggerClass: ".js-parallaxText2",
    childElements: "p",
    yOffset: 120,
    reversedYOffset: -120,
    start: scrollStart,
    end: scrollEnd,
  },

  {
    triggerClass: ".js-parallaxApp",
    childElements: "a",
    yOffset: 0,
    reversedYOffset: -90,
    start: scrollStart,
    end: scrollEnd,
  },
];

ParallaxTargets.forEach(
  ({ triggerClass, childElements, yOffset, reversedYOffset, start, end }) => {
    const targetElements = document.querySelectorAll(triggerClass);
    targetElements.forEach((target) => {
      gsap.fromTo(
        target.querySelectorAll(childElements),
        {
          yPercent: yOffset,
        },
        {
          yPercent: reversedYOffset,
          ease: "none",
          scrollTrigger: {
            trigger: target,
            start: start,
            end: end,
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true,
          },
        }
      );
    });
  }
);

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
function animateSVG(elementId) {
  new Vivus(
    elementId,
    {
      type: "sync",
      duration: 180,
      start: "inViewport",
      pathTimingFunction: Vivus.EASE_OUT,
      forceRender: false,
    },
    function (obj) {
      obj.el.classList.add("draw");
    }
  );
}

animateSVG("js-sdg-nine");
animateSVG("js-sdg-eleven");
animateSVG("js-sdg-twelve");
animateSVG("js-pro-01");
animateSVG("js-pro-02");
animateSVG("js-pro-03");
animateSVG("js-pro-04");
animateSVG("js-pro-05");

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

/* --------------------------------
 *  Stalker
 * -------------------------------- */
const stalker = document.querySelector(".js-stalker");
const app = document.querySelector(".js-app");

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  stalker.style.transform = `translate(${x}px, ${y}px)`;
});

app.addEventListener("mouseenter", () => {
  stalker.classList.add("js-hover");
});

app.addEventListener("mouseleave", () => {
  stalker.classList.remove("js-hover");
});

/* --------------------------------
 *  Matter.js
 * -------------------------------- */
function initMatterJs() {
  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Vector = Matter.Vector,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events;

  // エンジンの生成
  const engine = Engine.create();

  // キャンバスの生成
  const canvas = $("#js-canvas")[0];

  // レンダリングの設定
  const render = Render.create({
    element: canvas,
    engine: engine,
    options: {
      width: Math.min(Math.max(window.innerWidth * 0.4, 400), 440),
      height: Math.min(Math.max(window.innerWidth * 0.4, 488), 536),
      background: "#fff",
      wireframes: false,
      pixelRatio: 5,
    },
  });

  // マウスの設定
  const mouse = Mouse.create(canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      render: {
        visible: false,
      },
    },
  });

  Composite.add(engine.world, mouseConstraint);
  render.mouse = mouse;

  // レンダリングを実行
  Render.run(render);

  // エンジンを実行
  Runner.run(engine);

  // 壁の作成
  const wallThickness = 1;
  const canvasWidth = render.options.width;
  const canvasHeight = render.options.height;

  const leftWall = Bodies.rectangle(
    0,
    canvasHeight / 2,
    wallThickness,
    canvasHeight,
    {
      isStatic: true,
      render: {
        fillStyle: "rgba(0,0,0,0)",
      },
    }
  );
  const rightWall = Bodies.rectangle(
    canvasWidth,
    canvasHeight / 2,
    wallThickness,
    canvasHeight,
    {
      isStatic: true,
      render: {
        fillStyle: "rgba(0,0,0,0)",
      },
    }
  );
  const bottomWall = Bodies.rectangle(
    canvasWidth / 2,
    canvasHeight,
    canvasWidth,
    wallThickness,
    {
      isStatic: true,
      render: {
        fillStyle: "rgba(0,0,0,0)",
      },
    }
  );

  // オブジェクト
  const imagePaths = [
    "../../assets/images/philosophy-01.png",
    "../../assets/images/philosophy-02.png",
    "../../assets/images/philosophy-03.png",
  ];
  const numRectangles = imagePaths.length;
  const rectangles = [];
  for (let i = 0; i < numRectangles; i++) {
    const rectangle = Bodies.rectangle(
      Math.random() * (canvasWidth - 100) + 50,
      Math.random() * (canvasHeight - 100) + 50,
      160,
      60,
      {
        friction: 0.9,
        render: {
          fillStyle: "#333",
          sprite: {
            texture: imagePaths[i],
          },
        },
      }
    );
    rectangles.push(rectangle);
  }
  Composite.add(engine.world, rectangles);

  const circle = Bodies.circle(
    Math.random() * (canvasWidth - 100) + 50,
    50 - 50,
    50,
    {
      friction: 0.9,
      render: {
        fillStyle: "#f7d300",
        sprite: {
          texture: "../../assets/images/philosophy-04.png",
        },
      },
    }
  );

  const triangle = Bodies.polygon(
    Math.random() * (canvasWidth - 100) + 50,
    50,
    3,
    55,
    {
      friction: 0.9,
      render: {
        fillStyle: "#ed6a02",
      },
    }
  );

  Composite.add(engine.world, [
    leftWall,
    rightWall,
    bottomWall,
    circle,
    triangle,
  ]);

  // スクロールイベントを監視して、物体に力を適用する
  const scrollEvent = () => {
    const scrollDelta = window.scrollY - scrollY;

    allBodies.forEach((body) => {
      if (body.label === "_noMap") {
        return;
      }

      if (Math.floor(scrollDelta) % 5 === 0) {
        Body.applyForce(
          body,
          { x: body.position.x, y: body.position.y },
          {
            x:
              (Math.floor(Math.random() * 2) === 0 ? -1 : 1) *
              Math.random() *
              0.01,
            y: -0.04,
          },
          triangle,
          { x: triangle.position.x, y: triangle.position.y },
          {
            x: (Math.floor(Math.random() * 2) === 0 ? -1 : 1) * 0.005,
            y: -0.00005,
          }
        );
      }
    });
  };

  // スクロールイベントのリスナーを追加
  window.addEventListener("scroll", scrollEvent);

  // 初期スクロール位置を取得
  const scrollY = window.scrollY;

  // すべてのボディを取得
  const allBodies = Composite.allBodies(engine.world);
}
