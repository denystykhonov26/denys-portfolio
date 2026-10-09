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

const heroKinetic = document.querySelector(".hero-kinetic");

if (heroKinetic && !reduceMotion.matches) {
  window.setTimeout(() => heroKinetic.classList.remove("is-kinetic-active"), 2200);
}

const heroTitle = document.querySelector(".hero-title");
const turbulence = document.querySelector("#turb");
const displacement = document.querySelector("#disp");
const redOffset = document.querySelector("#redOffset");
const blueOffset = document.querySelector("#blueOffset");
const hoverCapable = window.matchMedia("(hover: hover)");
const interactionHint = document.querySelector(".hero-interaction-hint");

window.liquidKick = () => {};

if (heroTitle && turbulence && displacement && redOffset && blueOffset && !reduceMotion.matches) {
  let current = 0;
  let target = 0;
  let previousX = null;
  let previousY = null;
  let previousTouchX = null;
  let previousTouchY = null;
  let liquidFrame = 0;
  let liquidPaintFrame = 0;
  let introFrame = 0;
  let introTimer = 0;
  let idleTimer = 0;
  let idleResetFrame = 0;
  let turbulenceTime = 0;
  let flowX = 0;
  let flowY = 0;
  let activeDecay = 0.95;
  let titleHovered = false;
  let userMoved = false;
  let introPlayed = false;
  let filterIsActive = false;
  const maximumDistortion = 160;

  if (!finePointer.matches) turbulence.setAttribute("numOctaves", "2");

  const startLiquidFrame = () => {
    if (!liquidFrame) liquidFrame = requestAnimationFrame(animateLiquid);
  };

  window.liquidKick = (amount, directionX = 0, directionY = 0, decay = 0.95) => {
    target = Math.min(target + Math.max(0, amount), maximumDistortion);
    flowX = Math.max(-1, Math.min(1, directionX));
    flowY = Math.max(-1, Math.min(1, directionY));
    activeDecay = Math.max(0.85, Math.min(0.98, decay));
    startLiquidFrame();
  };

  const driveLiquidFromVelocity = (deltaX, deltaY) => {
    const speed = Math.hypot(deltaX, deltaY);
    target = Math.min(speed * 2.5, maximumDistortion);
    if (speed > 0) {
      flowX = deltaX / speed;
      flowY = deltaY / speed;
    }
    startLiquidFrame();
  };

  const setLiquidFilter = (active) => {
    if (filterIsActive === active) return;
    filterIsActive = active;
    heroTitle.classList.toggle("is-liquid-active", active);
    heroTitle.style.filter = active ? "url(#liquid)" : "none";
  };

  function animateLiquid() {
    target *= activeDecay;
    if (titleHovered) target = Math.max(target, 3);
    current += (target - current) * 0.18;
    turbulenceTime += 0.015;
    flowX *= 0.965;
    flowY *= 0.965;

    liquidPaintFrame += 1;
    const shouldUseFilter = titleHovered || current > 0.5;
    const lowEnergyHover = titleHovered && current < 5 && target <= 3.1;
    const shouldPaint = shouldUseFilter && (!lowEnergyHover || liquidPaintFrame % 2 === 0);
    setLiquidFilter(shouldUseFilter);

    if (shouldPaint) {
      displacement.setAttribute("scale", current.toFixed(2));

      if (liquidPaintFrame % 2 === 0) {
        const frequencyX = Math.max(0.001, 0.008 + Math.sin(turbulenceTime) * 0.005 + flowX * 0.0018);
        const frequencyY = Math.max(0.001, 0.014 + Math.sin(turbulenceTime + 1.35) * 0.005 + flowY * 0.0018);
        turbulence.setAttribute("baseFrequency", `${frequencyX.toFixed(4)} ${frequencyY.toFixed(4)}`);
      }

      const chromaticDirection = Math.abs(flowX) > 0.05 ? Math.sign(flowX) : 1;
      const chromaticX = current * 0.08 * chromaticDirection;
      const chromaticY = current * 0.035 * flowY;
      redOffset.setAttribute("dx", (-chromaticX).toFixed(2));
      redOffset.setAttribute("dy", (-chromaticY).toFixed(2));
      blueOffset.setAttribute("dx", chromaticX.toFixed(2));
      blueOffset.setAttribute("dy", chromaticY.toFixed(2));
    }

    if (titleHovered || current > 0.05 || target > 0.05) {
      liquidFrame = requestAnimationFrame(animateLiquid);
    } else {
      current = 0;
      target = 0;
      displacement.setAttribute("scale", "0");
      redOffset.setAttribute("dx", "0");
      redOffset.setAttribute("dy", "0");
      blueOffset.setAttribute("dx", "0");
      blueOffset.setAttribute("dy", "0");
      setLiquidFilter(false);
      liquidFrame = 0;
    }
  }

  const cancelIntro = () => {
    userMoved = true;
    window.clearTimeout(introTimer);
    if (introFrame) cancelAnimationFrame(introFrame);
    introFrame = 0;
  };

  const playIntroWave = () => {
    if (userMoved || introPlayed) return;
    introPlayed = true;
    const duration = 1200;
    const distance = heroTitle.getBoundingClientRect().width;
    let startedAt = 0;
    let previousFakeX = 0;

    const sweep = (time) => {
      if (userMoved) {
        introFrame = 0;
        return;
      }
      if (!startedAt) startedAt = time;
      const progressValue = Math.min((time - startedAt) / duration, 1);
      const eased = 0.5 - Math.cos(progressValue * Math.PI) / 2;
      const fakeX = distance * eased;
      const fakeSpeed = Math.max(0, fakeX - previousFakeX);
      const envelope = Math.sin(progressValue * Math.PI);
      target = Math.max(target, Math.min(Math.max(fakeSpeed * 2.5, 26), 54) * envelope);
      flowX = 1;
      flowY = Math.sin(progressValue * Math.PI * 2) * 0.12;
      activeDecay = 0.94;
      previousFakeX = fakeX;
      startLiquidFrame();

      if (progressValue < 1) {
        introFrame = requestAnimationFrame(sweep);
      } else {
        introFrame = 0;
      }
    };

    introFrame = requestAnimationFrame(sweep);
  };

  const scheduleIdlePulse = (delay = 5000) => {
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => {
      window.liquidKick(24, 1, 0, 0.94);
      scheduleIdlePulse(8000);
    }, delay);
  };

  introTimer = window.setTimeout(playIntroWave, 2300);

  if (hoverCapable.matches && finePointer.matches) {
    scheduleIdlePulse();

    document.addEventListener("mousemove", () => {
      if (!userMoved) cancelIntro();
      if (idleResetFrame) return;
      idleResetFrame = requestAnimationFrame(() => {
        scheduleIdlePulse();
        idleResetFrame = 0;
      });
    }, { passive: true });

    heroTitle.addEventListener("mouseenter", (event) => {
      titleHovered = true;
      previousX = event.clientX;
      previousY = event.clientY;
      activeDecay = 0.95;
      window.liquidKick(60, 0, 0, activeDecay);
    });

    heroTitle.addEventListener("mousemove", (event) => {
      interactionHint?.classList.add("is-hidden");
      if (heroTitle.classList.contains("is-kinetic-active")) {
        previousX = event.clientX;
        previousY = event.clientY;
        return;
      }
      const deltaX = previousX === null ? 0 : event.clientX - previousX;
      const deltaY = previousY === null ? 0 : event.clientY - previousY;
      driveLiquidFromVelocity(deltaX, deltaY);
      previousX = event.clientX;
      previousY = event.clientY;
    });

    heroTitle.addEventListener("mouseleave", () => {
      titleHovered = false;
      previousX = null;
      previousY = null;
      target = Math.max(target, current * 0.35);
      startLiquidFrame();
    });
  }

  heroTitle.addEventListener("touchstart", (event) => {
    cancelIntro();
    const touch = event.touches[0];
    if (!touch) return;
    previousTouchX = touch.clientX;
    previousTouchY = touch.clientY;
  }, { passive: true });

  heroTitle.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    const deltaX = previousTouchX === null ? 0 : touch.clientX - previousTouchX;
    const deltaY = previousTouchY === null ? 0 : touch.clientY - previousTouchY;
    driveLiquidFromVelocity(deltaX, deltaY);
    previousTouchX = touch.clientX;
    previousTouchY = touch.clientY;
  }, { passive: true });

  heroTitle.addEventListener("touchend", () => {
    previousTouchX = null;
    previousTouchY = null;
    target = Math.max(target, current * 0.35);
    startLiquidFrame();
  }, { passive: true });
}

const topNavigation = document.querySelector(".nav");

if (topNavigation) {
  const topNavigationLinks = topNavigation.querySelectorAll(".nav-link");

  topNavigationLinks.forEach((link) => {
    const label = link.textContent.trim();
    const roll = document.createElement("span");
    roll.className = "nav-roll";
    roll.setAttribute("aria-hidden", "true");
    link.textContent = "";
    link.setAttribute("aria-label", label);

    Array.from(label).forEach((letter, index) => {
      const character = document.createElement("span");
      character.className = "nav-char";
      character.style.setProperty("--i", index);
      character.textContent = letter === " " ? "\u00a0" : letter;
      roll.append(character);
    });

    link.append(roll);

    if (reduceMotion.matches || !hoverCapable.matches) return;

    let magneticFrame = 0;
    let magneticX = 0;
    let magneticY = 0;

    link.addEventListener("mousemove", (event) => {
      const bounds = link.getBoundingClientRect();
      magneticX = (event.clientX - bounds.left - bounds.width / 2) * 0.35;
      magneticY = (event.clientY - bounds.top - bounds.height / 2) * 0.5;
      link.classList.add("is-pulled");
      if (magneticFrame) return;
      magneticFrame = requestAnimationFrame(() => {
        link.style.setProperty("--nav-pull-x", `${magneticX.toFixed(2)}px`);
        link.style.setProperty("--nav-pull-y", `${magneticY.toFixed(2)}px`);
        magneticFrame = 0;
      });
    });

    link.addEventListener("mouseleave", () => {
      link.classList.remove("is-pulled");
      link.style.setProperty("--nav-pull-x", "0px");
      link.style.setProperty("--nav-pull-y", "0px");
    });
  });
}

if (!reduceMotion.matches && hoverCapable.matches && finePointer.matches) {
  const cursor = document.createElement("div");
  const cursorLabel = document.createElement("span");
  cursor.className = "interaction-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursorLabel.textContent = "move";
  cursor.append(cursorLabel);
  document.body.append(cursor);

  let pointerX = -100;
  let pointerY = -100;
  let cursorX = -100;
  let cursorY = -100;
  let cursorFrame = 0;

  const renderCursor = () => {
    cursorX += (pointerX - cursorX) * 0.18;
    cursorY += (pointerY - cursorY) * 0.18;
    cursor.style.transform = `translate3d(${cursorX.toFixed(2)}px, ${cursorY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    if (Math.abs(pointerX - cursorX) > 0.1 || Math.abs(pointerY - cursorY) > 0.1) {
      cursorFrame = requestAnimationFrame(renderCursor);
    } else {
      cursorFrame = 0;
    }
  };

  document.addEventListener("mousemove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursor.classList.add("is-visible");
    if (!cursorFrame) cursorFrame = requestAnimationFrame(renderCursor);
  }, { passive: true });

  document.documentElement.addEventListener("mouseleave", () => cursor.classList.remove("is-visible"));
  document.documentElement.addEventListener("mouseenter", () => cursor.classList.add("is-visible"));
  heroTitle?.addEventListener("mouseenter", () => cursor.classList.add("is-heading"));
  heroTitle?.addEventListener("mouseleave", () => cursor.classList.remove("is-heading"));
  topNavigation?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("mouseenter", () => cursor.classList.add("is-nav"));
    link.addEventListener("mouseleave", () => cursor.classList.remove("is-nav"));
  });
}

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
  document.querySelectorAll(".line-link, .quiet-link, .contact-email").forEach((target) => {
    target.classList.add("magnetic-target");
    target.addEventListener("pointermove", (event) => {
      const bounds = target.getBoundingClientRect();
      const clamp = (value, limit = 5) => Math.max(-limit, Math.min(limit, value));
      const x = clamp((event.clientX - bounds.left - bounds.width / 2) * 0.08);
      const y = clamp((event.clientY - bounds.top - bounds.height / 2) * 0.1);
      target.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
      target.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
    });
    target.addEventListener("pointerleave", () => {
      target.style.removeProperty("--magnetic-x");
      target.style.removeProperty("--magnetic-y");
    });
  });
}
