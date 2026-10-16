"use strict";

const products = [
  {
    id: "chitosan",
    title: "کیتوسان (Chitosan)",
    description:
      "یکی از محصولات زیست‌پلیمری شرکت افرا پلیمر نوآوران.",
    image: "image.webp"
  },
  {
    id: "chitin",
    title: "کیتین (Chitin)",
    description:
      "محصولی زیست‌پلیمری برای کاربردهای پژوهشی و صنعتی.",
    image: "image-(2).webp"
  },
  {
    id: "cellulose",
    title: "سلولز میکروکریستالین (Microcrystalline Cellulose)",
    description:
      "محصولی از خانواده زیست‌پلیمرها.",
    image: "image-(3).webp"
  },
  {
    id: "lignin",
    title: "لیگنین پایه (Lignin Basic)",
    description:
      "محصولی زیست‌پلیمری از سبد محصولات شرکت.",
    image: "image-(4).webp"
  },
  {
    id: "nanowhisker",
    title: "نانویسکر کیتین (Chitin Nanowhisker)",
    description:
      "محصول نانوساختار بر پایه کیتین.",
    image: "image-(5).webp"
  }
];

const productsGrid = document.getElementById("products-grid");
const modal = document.getElementById("product-modal");
const modalImage = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-desc");
const modalCloseButton = document.getElementById("modal-close");
const themeToggleButton = document.getElementById("theme-toggle");
const menuToggleButton = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

/**
 * ساخت کارت‌های محصولات
 */
function renderProducts() {
  if (!productsGrid) return;

  productsGrid.innerHTML = products.map((product) => `
    <button
      class="product-card"
      type="button"
      data-product-id="${product.id}"
      aria-label="نمایش جزئیات ${product.title}"
    >
      <span class="product-image-wrap">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
      </span>
      <span class="product-card-body">
        <span class="product-card-title">${product.title}</span>
        <span class="product-card-description">${product.description}</span>
      </span>
    </button>
  `).join("");
}

/**
 * باز کردن پنجره جزئیات محصول
 */
function openProductModal(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product || !modal) return;

  modalImage.src = product.image;
  modalImage.alt = product.title;
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (modalCloseButton) {
    modalCloseButton.focus();
  }
}

/**
 * بستن پنجره جزئیات محصول
 */
function closeProductModal() {
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/**
 * فعال‌سازی تم ذخیره‌شده
 */
function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";

  if (selectedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggleButton.textContent = "☀️";
    themeToggleButton.setAttribute("aria-label", "فعال کردن تم روشن");
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeToggleButton.textContent = "🌙";
    themeToggleButton.setAttribute("aria-label", "فعال کردن تم تاریک");
  }

  try {
    localStorage.setItem("afra-polymer-theme", selectedTheme);
  } catch (error) {
    // اگر localStorage در مرورگر غیرفعال باشد، سایت همچنان کار می‌کند.
  }
}

/**
 * آماده‌سازی ایمیل از طریق برنامه ایمیل دستگاه کاربر.
 * این فرم ایمیل را مستقیماً از سرور ارسال نمی‌کند.
 */
function handleContactForm(event) {
  event.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const reply = document.getElementById("contact-reply").value.trim();
  const subject = document.getElementById("contact-subject").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  const emailSubject = `پیام از وب‌سایت: ${subject}`;
  const emailBody = [
    `نام: ${name}`,
    `راه ارتباطی: ${reply}`,
    "",
    "متن پیام:",
    message
  ].join("\n");

  const mailtoUrl =
    `mailto:afrapolymernovavaran@gmail.com` +
    `?subject=${encodeURIComponent(emailSubject)}` +
    `&body=${encodeURIComponent(emailBody)}`;

  window.location.href = mailtoUrl;
}

/**
 * رویدادهای صفحه
 */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("afra-polymer-theme") || "light";
  } catch (error) {
    savedTheme = "light";
  }
  applyTheme(savedTheme);

  if (productsGrid) {
    productsGrid.addEventListener("click", (event) => {
      const card = event.target.closest("[data-product-id]");
      if (card) {
        openProductModal(card.dataset.productId);
      }
    });
  }

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

      applyTheme(isDark ? "light" : "dark");
    });
  }

  if (modalCloseButton) {
    modalCloseButton.addEventListener("click", closeProductModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target.matches("[data-close-modal]")) {
        closeProductModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProductModal();
      mainNav?.classList.remove("is-open");
      menuToggleButton?.setAttribute("aria-expanded", "false");
    }
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm);
  }

  if (menuToggleButton && mainNav) {
    menuToggleButton.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggleButton.setAttribute("aria-expanded", String(isOpen));
      menuToggleButton.setAttribute(
        "aria-label",
        isOpen ? "بستن منو" : "باز کردن منو"
      );
    });

    mainNav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        mainNav.classList.remove("is-open");
        menuToggleButton.setAttribute("aria-expanded", "false");
        menuToggleButton.setAttribute("aria-label", "باز کردن منو");
      }
    });
  }
});
