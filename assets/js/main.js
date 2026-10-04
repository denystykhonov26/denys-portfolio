document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const closeMenu = () => {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
  navLinks?.classList.toggle("is-open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", targetId);
  });
});
