(function () {
  "use strict";

  var STORAGE_KEY = "abtalks-day-12";
  var form = document.getElementById("challengeForm");
  var githubInput = document.getElementById("githubUrl");
  var linkedinInput = document.getElementById("linkedinUrl");
  var githubError = document.getElementById("githubError");
  var linkedinError = document.getElementById("linkedinError");
  var submitButton = document.getElementById("submitButton");
  var successState = document.getElementById("successState");
  var proofSection = document.querySelector(".challenge-proof");
  var timeRemaining = document.getElementById("timeRemaining");

  function formatTime(hours, minutes) {
    return hours + "h " + minutes + "m left";
  }

  function calculateTimeLeft() {
    var now = new Date();
    var tomorrow = new Date(now);
    tomorrow.setHours(24, 0, 0, 0);
    var diff = tomorrow - now;
    var hours = Math.floor(diff / (1000 * 60 * 60));
    var minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    return formatTime(hours, minutes);
  }

  function updateTimer() {
    if (timeRemaining) {
      timeRemaining.textContent = calculateTimeLeft();
    }
  }

  function normalizeUrl(value) {
    try {
      return new URL(value.trim());
    } catch (e) {
      return null;
    }
  }

  function validateGithub(value) {
    var url = normalizeUrl(value);
    if (!url) return "Please enter a valid GitHub URL.";
    if (!/(^|\.)github\.com$/.test(url.hostname)) {
      return "Please enter a valid GitHub URL.";
    }
    return "";
  }

  function validateLinkedIn(value) {
    var url = normalizeUrl(value);
    if (!url) return "Please enter a valid LinkedIn URL.";
    if (!/(^|\.)linkedin\.com$/.test(url.hostname)) {
      return "Please enter a valid LinkedIn URL.";
    }
    return "";
  }

  function setFieldError(element, message) {
    if (element) {
      element.textContent = message;
      element.parentElement.classList.toggle("has-error", Boolean(message));
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    var githubValue = githubInput.value.trim();
    var linkedinValue = linkedinInput.value.trim();
    var githubMessage = githubValue ? validateGithub(githubValue) : "Enter your GitHub repository or commit URL.";
    var linkedinMessage = linkedinValue ? validateLinkedIn(linkedinValue) : "Enter your LinkedIn post URL.";

    setFieldError(githubError, githubMessage);
    setFieldError(linkedinError, linkedinMessage);

    if (githubMessage || linkedinMessage) {
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    window.setTimeout(function () {
      try {
        var stored = {
          completed: true,
          githubUrl: githubValue,
          linkedinUrl: linkedinValue,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      } catch (e) {}

      showSuccessState();
    }, 350);
  }

  function showSuccessState() {
    if (proofSection) proofSection.hidden = true;
    if (successState) successState.hidden = false;
    if (submitButton) submitButton.disabled = false;
    if (successState) {
      var successButton = successState.querySelector(".success-action");
      if (successButton) successButton.focus();
    }
  }

  function resetState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    if (proofSection) proofSection.hidden = false;
    if (successState) successState.hidden = true;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "🚀 Submit Day 12";
    }
    if (githubInput) githubInput.value = "";
    if (linkedinInput) linkedinInput.value = "";
    setFieldError(githubError, "");
    setFieldError(linkedinError, "");
  }

  function restoreState() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      var parsed = JSON.parse(saved);
      if (parsed && parsed.completed) {
        if (githubInput) githubInput.value = parsed.githubUrl || "";
        if (linkedinInput) linkedinInput.value = parsed.linkedinUrl || "";
        showSuccessState();
      }
    } catch (e) {}
  }

  function init() {
    updateTimer();
    window.setInterval(updateTimer, 60000);
    if (form) form.addEventListener("submit", onSubmit);
    restoreState();
  }

  init();
})();
