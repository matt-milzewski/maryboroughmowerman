// Mobile Menu
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (!mobileMenuToggle || !mainNav) {
    return;
  }

  const closeMenu = () => {
    mainNav.classList.remove("active");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  };

  mobileMenuToggle.addEventListener("click", () => {
    const isExpanded =
      mobileMenuToggle.getAttribute("aria-expanded") === "true";
    mobileMenuToggle.setAttribute("aria-expanded", String(!isExpanded));
    mainNav.classList.toggle("active");
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !mainNav.contains(event.target) &&
      !mobileMenuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

// Testimonial Carousel
class TestimonialCarousel {
  constructor() {
    this.carousel = document.querySelector(".testimonial-carousel");
    this.slides = Array.from(document.querySelectorAll(".testimonial-slide"));
    this.currentIndex = Math.max(
      0,
      this.slides.findIndex((slide) => slide.classList.contains("is-active")),
    );
    this.slideInterval = 5000;
    this.intervalId = null;
    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (this.carousel && this.slides.length > 1) {
      this.init();
    }
  }

  init() {
    this.updateSlides();

    if (!this.prefersReducedMotion.matches) {
      this.startAutoRotation();
    }

    this.carousel.addEventListener("mouseenter", () => this.stopAutoRotation());
    this.carousel.addEventListener("mouseleave", () =>
      this.startAutoRotation(),
    );
    this.carousel.addEventListener("focusin", () => this.stopAutoRotation());
    this.carousel.addEventListener("focusout", () => this.startAutoRotation());
    this.prefersReducedMotion.addEventListener("change", () => {
      if (this.prefersReducedMotion.matches) {
        this.stopAutoRotation();
      } else {
        this.startAutoRotation();
      }
    });
  }

  startAutoRotation() {
    if (this.intervalId || this.prefersReducedMotion.matches) {
      return;
    }

    this.intervalId = window.setInterval(() => {
      this.nextSlide();
    }, this.slideInterval);
  }

  stopAutoRotation() {
    if (!this.intervalId) {
      return;
    }

    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlides();
  }

  updateSlides() {
    this.slides.forEach((slide, index) => {
      const isActive = index === this.currentIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
  }
}

// Form Validation
class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = Array.from(form.querySelectorAll("input, textarea"));
    this.groupFieldsets = Array.from(
      form.querySelectorAll("[data-required-group]"),
    );
    this.submitButton = form.querySelector('button[type="submit"]');
    this.defaultButtonText = this.submitButton
      ? this.submitButton.textContent
      : "";

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
    this.fields.forEach((field) => {
      field.addEventListener("input", () => this.validateField(field));
      field.addEventListener("blur", () => this.validateField(field));
    });
    this.groupFieldsets.forEach((fieldset) => {
      fieldset.addEventListener("change", () => this.validateGroup(fieldset));
    });
  }

  validateField(field) {
    if (field.type === "checkbox" || field.type === "radio") {
      return true;
    }

    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    if (!field.required && !value) {
      this.updateFieldStatus(field, true, "");
      return true;
    }

    if (field.required && !value) {
      isValid = false;
      errorMessage = "This field is required";
    } else if (field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      errorMessage = "Please enter a valid email address";
    } else if (field.type === "tel") {
      const phoneRegex = /^[\d\s+()-]{10,}$/;
      isValid = phoneRegex.test(value);
      errorMessage = "Please enter a valid phone number";
    }

    this.updateFieldStatus(field, isValid, errorMessage);
    return isValid;
  }

  validateGroup(fieldset) {
    const groupName = fieldset.dataset.requiredGroup;
    const inputs = Array.from(
      fieldset.querySelectorAll(`input[name="${groupName}"]`),
    );
    const isValid = inputs.some((input) => input.checked);
    const errorMessage =
      fieldset.dataset.errorMessage || "Please choose an option";

    this.updateGroupStatus(fieldset, inputs, isValid, errorMessage);
    return isValid;
  }

  updateFieldStatus(field, isValid, errorMessage) {
    const errorId = `${field.id || field.name}-error`;
    let errorElement = field.parentElement.querySelector(".error-message");

    if (!isValid) {
      if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.id = errorId;
        field.parentElement.appendChild(errorElement);
      }

      errorElement.textContent = errorMessage;
      field.classList.add("invalid");
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", errorId);
    } else {
      if (errorElement) {
        errorElement.remove();
      }

      field.classList.remove("invalid");
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
    }
  }

  updateGroupStatus(fieldset, inputs, isValid, errorMessage) {
    const errorId = `${fieldset.dataset.requiredGroup}-error`;
    let errorElement = fieldset.querySelector(".error-message");

    if (!isValid) {
      if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.id = errorId;
        fieldset.appendChild(errorElement);
      }

      errorElement.textContent = errorMessage;
      fieldset.classList.add("invalid");
      inputs.forEach((input) => {
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", errorId);
      });
    } else {
      if (errorElement) {
        errorElement.remove();
      }

      fieldset.classList.remove("invalid");
      inputs.forEach((input) => {
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    let isValid = true;
    this.fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    this.groupFieldsets.forEach((fieldset) => {
      if (!this.validateGroup(fieldset)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showToast("Please fill in all fields correctly", "error");
      return;
    }

    this.setSubmitting(true);

    try {
      const formData = new FormData(this.form);
      const response = await fetch(this.form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      this.showToast("Message sent successfully!", "success");
      this.form.reset();
    } catch (error) {
      this.showToast(
        "Error sending message. Please call or email us instead.",
        "error",
      );
    } finally {
      this.setSubmitting(false);
    }
  }

  setSubmitting(isSubmitting) {
    if (!this.submitButton) {
      return;
    }

    this.submitButton.disabled = isSubmitting;
    this.submitButton.textContent = isSubmitting
      ? "Sending..."
      : this.defaultButtonText;
  }

  showToast(message, type) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.setAttribute("role", type === "error" ? "alert" : "status");
    toast.setAttribute("aria-live", type === "error" ? "assertive" : "polite");

    document.body.appendChild(toast);

    window.setTimeout(() => toast.classList.add("show"), 100);

    window.setTimeout(() => {
      toast.classList.remove("show");
      window.setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Scroll Animation
class ScrollAnimator {
  constructor() {
    this.elements = document.querySelectorAll(".fade-in");
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        },
      );

      this.elements.forEach((element) => observer.observe(element));
    } else {
      this.elements.forEach((element) => element.classList.add("visible"));
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const currentYear = document.querySelector("[data-current-year]");
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  initMobileMenu();
  new TestimonialCarousel();

  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    new FormValidator(contactForm);
  }

  new ScrollAnimator();
});
