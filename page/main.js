const stage = document.getElementById("stage");
const scrollHint = document.getElementById("scrollHint");
const videoWrapper = document.querySelector(".videos");

const darks = [
  [90, 20, 60],
  [20, 20, 90],
  [15, 70, 40],
];
const lights = [
  [255, 210, 60],
  [255, 145, 55],
  [220, 80, 210],
];

const COLUMNS = [...videoWrapper.querySelectorAll("dither-dither")].map((dither, i) => ({
  dither,
  dark: darks[i],
  light: lights[i],
}));

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const mix = (a, b, t) => `rgb(${a.map((c, i) => Math.round(c + (b[i] - c) * t)).join(", ")})`;

function update() {
  const rect = stage.getBoundingClientRect();
  const progress = clamp(-rect.top / (rect.height - window.innerHeight), 0, 1);

  const maxSize = Math.min(window.innerWidth * 0.19, window.innerHeight);
  const minSize = maxSize * 0.2;
  const size = Math.round(minSize + maxSize * progress);

  videoWrapper.style.transform = `translateY(${20 * (1 - progress)}vh)`;

  // duotone intensity
  const duotone = clamp(Math.min((progress - 0.2) / 0.25, (1 - progress) / 0.25), 0, 1);

  for (const { dither, dark, light } of COLUMNS) {
    dither.setAttribute("width", size);
    dither.setAttribute("dark", mix([0, 0, 0], dark, progress));
    dither.setAttribute("light", mix([255, 255, 255], light, progress));
  }

  scrollHint.style.display = progress > 0 ? "none" : "block";
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    update();
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
update();
