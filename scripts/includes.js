// Người phụ trách: Bình. Các việc cần làm: Viết logic JS, xử lý sự kiện, tối ưu hiệu năng */
const includeTargets = Array.from(document.querySelectorAll("[data-include]"));

async function loadPartial(target) {
  const sourcePath = target.getAttribute("data-include");

  if (!sourcePath) {
    return;
  }

  try {
    const response = await fetch(sourcePath, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Cannot load partial: ${sourcePath}`);
    }

    const html = await response.text();
    target.outerHTML = html;
  } catch (error) {
    console.error(error);
    target.innerHTML = "";
    target.hidden = true;
  }
}

Promise.all(includeTargets.map(loadPartial))
  .then(() => {
    initTestimonialCarousel();
    initBookingForm();
  })
  .catch((error) => {
    console.error("Failed to load page components", error);
  });

function initTestimonialCarousel() {
  const track = document.getElementById("testimonialTrack");
  if (!track) return;

  // Clone the content once for seamless infinite marquee effect
  const originalContent = track.innerHTML;
  track.innerHTML = originalContent + originalContent;
}

function initBookingForm() {
  const form = document.getElementById("bookingForm");

  if (!form) {
    return;
  }

  const storageKey = "cmec_booking_draft_v1";
  const panels = Array.from(form.querySelectorAll("[data-step]"));
  const indicators = Array.from(form.querySelectorAll("[data-step-indicator]"));
  const prevButton = form.querySelector('[data-action="prev"]');
  const nextButton = form.querySelector('[data-action="next"]');
  const clearButton = form.querySelector('[data-action="clear"]');
  const submitButton = form.querySelector('[data-action="submit"]');
  const statusElement = form.querySelector(".booking-status");
  const fields = Array.from(
    form.querySelectorAll("input[name], select[name], textarea[name]"),
  );
  const totalSteps = panels.length;
  let currentStep = 1;

  function setStatus(message, type) {
    if (!statusElement) {
      return;
    }

    statusElement.textContent = message || "";
    statusElement.classList.remove("is-success", "is-error");

    if (type === "success") {
      statusElement.classList.add("is-success");
    }

    if (type === "error") {
      statusElement.classList.add("is-error");
    }
  }

  function getFieldValue(field) {
    if (field.type === "checkbox") {
      return field.checked;
    }

    return field.value;
  }

  function setFieldValue(field, value) {
    if (field.type === "checkbox") {
      field.checked = Boolean(value);
      return;
    }

    field.value = typeof value === "string" ? value : "";
  }

  function saveDraft(showMessage) {
    const draft = {
      currentStep,
      data: {},
      updatedAt: new Date().toISOString(),
    };

    fields.forEach((field) => {
      draft.data[field.name] = getFieldValue(field);
    });

    localStorage.setItem(storageKey, JSON.stringify(draft));

    if (showMessage) {
      setStatus("Da luu tam thong tin vao trinh duyet.");
    }
  }

  function getStepFields(step) {
    const stepPanel = form.querySelector(`[data-step="${step}"]`);

    if (!stepPanel) {
      return [];
    }

    return Array.from(stepPanel.querySelectorAll("input, select, textarea"));
  }

  function validateStep(step) {
    const stepFields = getStepFields(step);
    let firstInvalidField = null;

    stepFields.forEach((field) => {
      if (!field.checkValidity() && !firstInvalidField) {
        firstInvalidField = field;
      }
    });

    if (!firstInvalidField) {
      return true;
    }

    firstInvalidField.reportValidity();
    firstInvalidField.focus();
    setStatus("Vui long hoan tat thong tin bat buoc o buoc hien tai.", "error");
    return false;
  }

  function updateSteps() {
    panels.forEach((panel, index) => {
      const step = index + 1;
      const isActive = step === currentStep;

      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);
    });

    indicators.forEach((indicator, index) => {
      const step = index + 1;
      indicator.classList.toggle("is-active", step === currentStep);
      indicator.classList.toggle("is-complete", step < currentStep);
    });

    if (prevButton) {
      prevButton.disabled = currentStep === 1;
    }

    if (nextButton) {
      nextButton.hidden = currentStep === totalSteps;
    }

    if (submitButton) {
      submitButton.hidden = currentStep !== totalSteps;
    }
  }

  function goToStep(step) {
    const safeStep = Math.min(totalSteps, Math.max(1, step));
    currentStep = safeStep;
    updateSteps();
    saveDraft(false);
  }

  function restoreDraft() {
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      return;
    }

    try {
      const draft = JSON.parse(raw);

      if (!draft || typeof draft !== "object" || !draft.data) {
        return;
      }

      fields.forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(draft.data, field.name)) {
          setFieldValue(field, draft.data[field.name]);
        }
      });

      const restoredStep = Number(draft.currentStep);

      if (!Number.isNaN(restoredStep)) {
        currentStep = restoredStep;
      }

      setStatus("Da khoi phuc du lieu luu tam.", "success");
    } catch (error) {
      console.warn("Cannot parse booking draft", error);
      localStorage.removeItem(storageKey);
    }
  }

  function clearDraftAndReset() {
    localStorage.removeItem(storageKey);
    form.reset();
    currentStep = 1;
    updateSteps();
    setStatus("Da xoa du lieu tam.", "success");
  }

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      saveDraft(true);
    });

    field.addEventListener("change", () => {
      saveDraft(true);
    });
  });

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (!validateStep(currentStep)) {
        return;
      }

      goToStep(currentStep + 1);
      setStatus("");
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      goToStep(currentStep - 1);
      setStatus("");
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", clearDraftAndReset);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    localStorage.removeItem(storageKey);
    setStatus(
      "Gui yeu cau dat lich thanh cong. CSKH se lien he som nhat.",
      "success",
    );
    form.reset();
    currentStep = 1;
    updateSteps();
  });

  restoreDraft();
  updateSteps();
  saveDraft(false);
}
