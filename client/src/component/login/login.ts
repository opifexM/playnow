import { loadRegistrationPage } from "../../page/registration-page/registration-page.ts";
import { loadTrackPage } from "../../page/track-page/track-page.ts";
import { loginAction } from "../../store/action.ts";

export function getLogin(): string {
  return `
    <div class="playlists-modal">
      <div class="playlists-modal__title">Play Now - Login</div>
      <div class="login-modal__content">
        <div class="login-modal__input-group">
          <label class="login-modal__label" for="username">Login:</label>
          <input class="login-modal__input" id="username" placeholder="Insert Login" type="text" />
        </div>
        <div class="login-modal__input-group">
          <label class="login-modal__label" for="password">Password:</label>
          <input class="login-modal__input" id="password" placeholder="Insert Password" type="password" />
        </div>
      </div>
      <div class="playlists-modal__footer">
        <div id="registration-button">Sign Up</div>
        <div class="playlists-modal__close-btn"id="login-button">Login</div>
      </div>
    </div>
  `;
}

export function attachLoginHandler(pageDiv: HTMLDivElement): void {
  const loginButton = pageDiv.querySelector(
    "#login-button",
  ) as HTMLButtonElement;
  const registrationButton = pageDiv.querySelector(
    "#registration-button",
  ) as HTMLButtonElement;
  const usernameInput = pageDiv.querySelector("#username") as HTMLInputElement;
  const passwordInput = pageDiv.querySelector("#password") as HTMLInputElement;

  if (loginButton && usernameInput && passwordInput) {
    loginButton.addEventListener("click", async () => {
      loginButton.disabled = true;
      try {
        await loginAction({
          username: usernameInput.value,
          password: passwordInput.value,
        });
        await loadTrackPage();
      } catch (e) {
      } finally {
        loginButton.disabled = false;
      }
    });
  }
  if (registrationButton) {
    registrationButton.addEventListener("click", async () => {
      await loadRegistrationPage();
    });
  }
}
