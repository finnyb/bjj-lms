export class Alert {
  type: AlertType;
  message: string;
  action: string;

  constructor(props: Required<Alert>) {
    Object.assign(this, props);
  }
}

export enum AlertType {
  Success,
  Info,
  Warning,
  Error,
}
