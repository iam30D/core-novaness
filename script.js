const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("[data-nav]");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const getPathKey = (value) => {
  if (!value) {
    return "index";
  }

  const cleanValue = value.split("#")[0].split("?")[0];
  const trimmed = cleanValue.replace(/\/+$/, "");

  if (!trimmed || trimmed === "/") {
    return "index";
  }

  const lastSegment = trimmed.split("/").pop() || "index";
  return lastSegment.replace(/\.html$/, "") || "index";
};

const currentPath = getPathKey(window.location.pathname);
document.querySelectorAll(".site-nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (getPathKey(href) === currentPath) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const revealNodes = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && revealNodes.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const form = document.querySelector("[data-mail-form]");
const status = document.querySelector("[data-form-status]");

if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      status.textContent = "Please complete your name, email, and project message.";
      status.className = "form-status status-error";
      return;
    }

    const subject = `New inquiry from ${name}${service ? ` | ${service}` : ""}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      `Service of interest: ${service || "Not specified"}`,
      "",
      "Project details:",
      message
    ];

    const mailto = `mailto:support@corenovaness.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    status.textContent = "Opening your email app with a draft inquiry.";
    status.className = "form-status status-success";
    window.location.href = mailto;
  });
}
