/**
 * The Digitize
 * Main client-side JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    setupScrollReveal();
    setupContactForm();
});

/**
 * Mobile navigation
 */
function setupMobileMenu() {
    const menuButton = document.getElementById("mobileMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuButton || !mobileMenu) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.toggle("hidden");

        menuButton.setAttribute("aria-expanded", String(!isHidden));
        menuButton.setAttribute(
            "aria-label",
            isHidden ? "Open navigation menu" : "Close navigation menu"
        );
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
        });
    });
}

/**
 * Reveals sections as they enter the viewport.
 */
function setupScrollReveal() {
    const elements = document.querySelectorAll(".fade-in-up");

    if (!elements.length) {
        return;
    }

    // IntersectionObserver is cleaner and more efficient than
    // checking every element on every scroll event.
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1
            }
        );

        elements.forEach((element) => observer.observe(element));
        return;
    }

    // Fallback for older browsers.
    elements.forEach((element) => {
        element.classList.add("visible");
    });
}

/**
 * Current contact form behaviour.
 *
 * The original page called handleFormSubmit(), but that function
 * did not exist. For now we prevent the browser's default submit
 * behaviour and provide a clear status message.
 *
 * When a real backend or form service is added, this function is
 * the correct place to connect the form to it.
 */
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (!form || !status) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        status.textContent =
            "Thank you for your message. We will get back to you within 24 hours.";
        status.classList.remove("hidden");

        form.reset();
    });
}
