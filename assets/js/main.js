document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-list");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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
window.addEventListener("scroll", updateHeader, { passive: true });

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
