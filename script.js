const texts = [
  "Full Stack Developer’ım.",
  "Web uygulamaları geliştiriyorum.",
  "Mobil ve masaüstü ürünler üretiyorum.",
];

let count = 0;
let index = 0;
let currentText = texts[0];
let isDeleting = false;

function type() {
  const target = document.getElementById("changing-text");
  if (!target) return;

  const typingSpeed = isDeleting ? 28 : 70;
  target.textContent = currentText.slice(0, index);

  if (!isDeleting && index < currentText.length) {
    index += 1;
    window.setTimeout(type, typingSpeed);
    return;
  }

  if (isDeleting && index > 0) {
    index -= 1;
    window.setTimeout(type, typingSpeed);
    return;
  }

  if (!isDeleting && index === currentText.length) {
    window.setTimeout(() => {
      isDeleting = true;
      type();
    }, 1400);
    return;
  }

  isDeleting = false;
  count = (count + 1) % texts.length;
  currentText = texts[count];
  window.setTimeout(type, 220);
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  const year = document.getElementById("year");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastScrollY = window.scrollY || 0;

  if (year) year.textContent = String(new Date().getFullYear());

  if (!reduceMotion) {
    type();
  } else {
    const target = document.getElementById("changing-text");
    if (target) target.textContent = texts[0];
  }

  const getScrollY = () => {
    const scrolling = document.scrollingElement || document.documentElement;
    return Math.max(scrolling.scrollTop, window.scrollY, window.pageYOffset, 0);
  };

  const setHeaderHidden = (hidden) => {
    if (!header) return;
    if (nav?.classList.contains("is-open")) hidden = false;
    header.classList.toggle("is-hidden", hidden);
    toggle?.classList.toggle("is-hidden", hidden);
  };

  const onScroll = () => {
    const y = getScrollY();
    header?.classList.toggle("is-scrolled", y > 8);

    if (y <= 40) {
      setHeaderHidden(false);
      lastScrollY = y;
      return;
    }

    if (y > lastScrollY) {
      setHeaderHidden(true);
    } else if (y < lastScrollY) {
      setHeaderHidden(false);
    }
    lastScrollY = y;
  };

  lastScrollY = getScrollY();
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  window.addEventListener(
    "wheel",
    (event) => {
      if (nav?.classList.contains("is-open")) return;
      if (getScrollY() <= 40 && event.deltaY <= 0) {
        setHeaderHidden(false);
        return;
      }
      if (event.deltaY > 0) setHeaderHidden(true);
      if (event.deltaY < 0) setHeaderHidden(false);
    },
    { passive: true }
  );

  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    const label = toggle.querySelector("em");
    if (label) label.textContent = open ? "Kapat" : "Menü";
    if (open) {
      header?.classList.remove("is-hidden");
      toggle.classList.remove("is-hidden");
    }
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", "Menüyü aç");
      const label = toggle?.querySelector("em");
      if (label) label.textContent = "Menü";
    });
  });
});
