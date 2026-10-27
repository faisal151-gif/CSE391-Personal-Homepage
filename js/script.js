(function () {
  "use strict";

  // footer: page URL and last modified date
  var locationEl = document.getElementById("page-location");
  var modifiedEl = document.getElementById("last-modified");

  if (locationEl) {
    locationEl.textContent = window.location.href;
  }

  if (modifiedEl) {
    var modified = new Date(document.lastModified);
    modifiedEl.textContent = isNaN(modified.getTime())
      ? document.lastModified
      : modified.toLocaleString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
  }

  // remember dark mode setting
  var toggle = document.getElementById("theme-toggle");

  if (toggle) {
    try {
      toggle.checked = localStorage.getItem("theme") === "dark";
    } catch (e) {}

    toggle.addEventListener("change", function () {
      try {
        localStorage.setItem("theme", toggle.checked ? "dark" : "light");
      } catch (e) {}
    });
  }

  // contact form validation
  var form = document.getElementById("contact-form");

  if (form) {
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");
    var status = document.getElementById("form-status");

    form.addEventListener("submit", function (event) {
      var errors = [];

      nameInput.className = "";
      emailInput.className = "";
      messageInput.className = "";

      if (nameInput.value.trim() === "") {
        errors.push("enter your name");
        nameInput.className = "invalid";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        errors.push("enter a valid email address");
        emailInput.className = "invalid";
      }
      if (messageInput.value.trim().length < 10) {
        errors.push("write a message of at least 10 characters");
        messageInput.className = "invalid";
      }

      if (errors.length > 0) {
        event.preventDefault();
        status.className = "form-status error";
        status.textContent = "Please " + errors.join(", ") + ".";
        return;
      }

      status.className = "form-status success";
      status.textContent = "Sending...";
    });
  }
})();
