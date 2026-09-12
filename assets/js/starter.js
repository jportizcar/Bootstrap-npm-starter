// Importing JavaScript
//
// You have two choices for including Bootstrap's JS files—the whole thing,
// or just the bits that you need.


// Option 1
//
// Import Bootstrap's bundle (all of Bootstrap's JS + Popper.js dependency)

// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


// Option 2
//
// Import just what we need

// If you're importing tooltips or popovers, be sure to include our Popper.js dependency
// import "../../node_modules/popper.js/dist/popper.min.js";

import "../../node_modules/bootstrap/js/dist/util.js";
import "../../node_modules/bootstrap/js/dist/modal.js";

// Contact form: Bootstrap validation styles + AJAX submit to Netlify Forms
const contactForm = document.querySelector('form[name="contact"]');

if (contactForm) {
  const statusEl = contactForm.querySelector(".contact-form__status");
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  const encode = (data) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");

  const setStatus = (message, isError) => {
    statusEl.textContent = message;
    statusEl.classList.toggle("text-danger", isError);
    statusEl.classList.toggle("text-success", !isError);
  };

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      return;
    }

    submitBtn.disabled = true;
    setStatus("Enviando...", false);

    const formData = new FormData(contactForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(Object.fromEntries(formData)),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Request failed");
      })
      .then(() => {
        setStatus("¡Gracias! Tu mensaje fue enviado.", false);
        contactForm.reset();
        contactForm.classList.remove("was-validated");
      })
      .catch(() => {
        setStatus("Ocurrió un error al enviar. Intentá de nuevo.", true);
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });
}
