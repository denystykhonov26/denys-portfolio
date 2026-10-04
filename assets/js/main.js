document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-list");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");

const progress = document.createElement("div");
progress.className = "scroll-progress";
progress.setAttribute("aria-hidden", "true");
document.body.prepend(progress);

let progressFrame = 0;
const updateScrollProgress = () => {
  if (progressFrame) return;
  progressFrame = requestAnimationFrame(() => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const value = distance > 0 ? Math.min(window.scrollY / distance, 1) : 0;
    progress.style.setProperty("--scroll-progress", value.toFixed(4));
    progressFrame = 0;
  });
};

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

updateHeader();
updateScrollProgress();
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("scroll", updateScrollProgress, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  navigation?.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) closeMenu();
});

document.querySelectorAll(".display-title, .about-preview-title, .contact-title, .story-heading, .case-chapter h2").forEach((title) => {
  title.classList.add("reveal", "reveal-title");
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -7%", threshold: 0.1 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const selector = anchor.getAttribute("href");
    if (!selector || selector === "#") return;
    const target = document.querySelector(selector);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", selector);
  });
});

if (!reduceMotion.matches && finePointer.matches) {
  document.querySelectorAll(".line-link, .contact-email, .wordmark").forEach((target) => {
    target.classList.add("magnetic-target");
    target.addEventListener("pointermove", (event) => {
      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
      target.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
      target.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
    });
    target.addEventListener("pointerleave", () => {
      target.style.removeProperty("--magnetic-x");
      target.style.removeProperty("--magnetic-y");
    });
  });
}
