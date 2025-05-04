import { displayMessage } from "../../ui/common/displayMessage.js";
import { saveToken, saveUser } from "../../utils/storage.js";

async function handleLoginSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const messageContainer = document.querySelector("#message-container");
  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("button[type='submit']");
  const formData = new FormData(form);
  const { email, password } = Object.fromEntries(formData.entries());

  messageContainer.innerHTML = "";
  fieldset.disabled = true;
  submitButton.textContent = "Logging in...";

  try {
    if (email === "testuser@example.com" && password === "testpassword") {
      saveToken("fake-token");
      saveUser({ email });

      displayMessage(messageContainer, "success", `Welcome, testuser!`);
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    displayMessage(messageContainer, "error", error.message);
  } finally {
    fieldset.disabled = false;
    submitButton.textContent = "Login";
  }
}

export function loginFormListener() {
  const form = document.querySelector("#loginForm");
  if (form) {
    form.addEventListener("submit", handleLoginSubmit);
  }
}
