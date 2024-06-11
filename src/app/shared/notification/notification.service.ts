import { Injectable } from "@angular/core";

declare var $: any;

export enum NotificationType {
  info = "info",
  success = "success",
  warning = "warning",
  danger = "danger",
}

@Injectable({ providedIn: "root" })
export class NotificationService {
  constructor() {}

  showSucess(message) {
    this.showNotification(NotificationType.success, "Sucesso", message);
  }

  showInfo(message) {
    this.showNotification(NotificationType.success, "Atenção", message);
  }

  showError(message) {
    this.showNotification(NotificationType.success, "Um erro ocorreu", message);
  }

  showNotification(type: NotificationType, title, message) {
    $.notify(
      {
        icon: "notifications",
        title: title,
        message: message,
      },
      {
        type: type.toString(),
        delay: 1000,
        timer: 2000,
        placement: {
          from: "top",
          align: "center",
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title" class="notification-title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }
}
