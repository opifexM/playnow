import { loadLoginPage } from "../../page/login-page/login-page.ts";
import { registrationAction } from "../../store/action.ts";

export function getRegistration(): string {
  return `
    <div class="playlists-modal">
      <div class="playlists-modal__title">Play Now - Registration</div>
      <div class="login-modal__content">
        <div class="login-modal__input-group">
          <label class="login-modal__label" for="username">Login:</label>
          <input class="login-modal__input" id="username" placeholder="Insert Login" type="text" />
        </div>
        <div class="login-modal__input-group">
          <label class="login-modal__label" for="password">Password:</label>
          <input class="login-modal__input" id="password" placeholder="Insert Password" type="password" />
        </div>      
        <div class="login-modal__input-group">
          <label class="login-modal__label" for="firstName">First Name:</label>
          <input class="login-modal__input" id="firstName" placeholder="Insert First Name" type="text" />
        </div>      
        <div class="login-modal__input-group">
          <label class="login-modal__label" for="lastName">Last Name:</label>
          <input class="login-modal__input" id="lastName" placeholder="Insert Last Name" type="text" />
        </div>
      </div>
      <div class="playlists-modal__footer">
        <div id="login-button">Login</div>
        <div class="playlists-modal__close-btn" id="registration-button">Sign Up</div>
      </div>
    </div>
  `;
}

export function attachRegistrationHandler(pageDiv: HTMLDivElement): void {
  const loginButton = pageDiv.querySelector(
    "#login-button",
  ) as HTMLButtonElement;
  const registrationButton = pageDiv.querySelector(
    "#registration-button",
  ) as HTMLButtonElement;
  const usernameInput = pageDiv.querySelector("#username") as HTMLInputElement;
  const passwordInput = pageDiv.querySelector("#password") as HTMLInputElement;
  const firstNameInput = pageDiv.querySelector(
    "#firstName",
  ) as HTMLInputElement;
  const lastNameInput = pageDiv.querySelector("#lastName") as HTMLInputElement;

  if (
    registrationButton &&
    usernameInput &&
    passwordInput &&
    firstNameInput &&
    lastNameInput
  ) {
    registrationButton.addEventListener("click", async () => {
      registrationButton.disabled = true;
      try {
        await registrationAction({
          username: usernameInput.value,
          password: passwordInput.value,
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
        });
        await loadLoginPage();
      } catch (e) {
      } finally {
        registrationButton.disabled = false;
      }
    });
  }
  if (loginButton) {
    loginButton.addEventListener("click", async () => {
      await loadLoginPage();
    });
  }
}
