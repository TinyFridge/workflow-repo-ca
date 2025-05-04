import { login } from "../../api/auth/login.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { saveToken, saveUser } from "../../utils/storage.js";
import { validateLoginForm } from "../../utils/validation.js";

async function handleLoginSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const messageContainer = document.querySelector("#message-container");
  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("button[type='submit']");

  messageContainer.innerHTML = "";

  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  const { isValid, errors } = validateLoginForm(
    profile.email,
    profile.password,
  );
  if (!isValid) {
    displayMessage(messageContainer, "error", errors.join("<br>"));
    return;
  }

  fieldset.disabled = true;
  submitButton.textContent = "Logging in...";

  try {
    const { accessToken, ...user } = await login(profile);
    saveToken(accessToken);
    saveUser(user);

    displayMessage(
      messageContainer,
      "success",
      `Welcome, ${user.name || "user"}! You are now logged in.`,
    );

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1500);
  } catch (error) {
    displayMessage(messageContainer, "error", error.message || "Login failed");
  } finally {
    fieldset.disabled = false;
    submitButton.textContent = "Login";
  }
}

export function loginFormListener() {
  const form = document.querySelector("#loginForm");
  if (form) {
    console.log("✅ Login form listener attached");
    form.addEventListener("submit", handleLoginSubmit);
  } else {
    console.error("❌ Login form not found");
  }
}
