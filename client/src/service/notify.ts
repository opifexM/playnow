import Toastify from "toastify-js";

export enum NotificationType {
  SUCCESS = "green",
  INFO = "blue",
  ERROR = "red",
}

export function sendNotify(type: NotificationType, text: string): void {
  Toastify({
    text: text,
    duration: 3000,
    style: {
      background: type,
    },
  }).showToast();
}
