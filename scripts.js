// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Testimonial Carousel
class TestimonialCarousel {
    constructor() {
        this.carousel = document.querySelector('.testimonial-carousel');
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.currentIndex = 0;
        this.slideInterval = 5000; // 5 seconds per slide
        
        if (this.slides.length > 1) {
            this.init();
        }
    }

    init() {
        // Set initial positions
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
        });

        // Start auto-rotation
        this.startAutoRotation();
    }

    startAutoRotation() {
        setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlides();
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            const offset = (index - this.currentIndex + this.slides.length) % this.slides.length;
            slide.style.transform = `translateX(${offset * 100}%)`;
        });
    }
}

// Form Validation
class FormValidator {
    constructor(form) {
        this.form = form;
        this.fields = form.querySelectorAll('input, textarea');
        this.submitButton = form.querySelector('button[type="submit"]');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.fields.forEach(field => {
            field.addEventListener('input', () => this.validateField(field));
            field.addEventListener('blur', () => this.validateField(field));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;

            case 'tel':
                const phoneRegex = /^[\d\s+()-]{10,}$/;
                isValid = phoneRegex.test(value);
                errorMessage = 'Please enter a valid phone number';
                break;

            default:
                isValid = value.length > 0;
                errorMessage = 'This field is required';
        }

        this.updateFieldStatus(field, isValid, errorMessage);
        return isValid;
    }

    updateFieldStatus(field, isValid, errorMessage) {
        const errorElement = field.parentElement.querySelector('.error-message') || 
            document.createElement('div');
        
        if (!isValid) {
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            if (!field.parentElement.querySelector('.error-message')) {
                field.parentElement.appendChild(errorElement);
            }
            field.classList.add('invalid');
        } else {
            errorElement.remove();
            field.classList.remove('invalid');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        let isValid = true;
        this.fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showToast('Please fill in all fields correctly', 'error');
            return;
        }

        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showToast('Message sent successfully!', 'success');
                this.form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            this.showToast('Error sending message. Please try again.', 'error');
        }
    }

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Scroll Animation
class ScrollAnimator {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            this.elements.forEach(element => observer.observe(element));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            this.elements.forEach(element => element.classList.add('visible'));
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize testimonial carousel
    new TestimonialCarousel();

    // Initialize form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        new FormValidator(contactForm);
    }

    // Initialize scroll animations
    new ScrollAnimator();
}); 