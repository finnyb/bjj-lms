export class App {
  name: string;
  type: string;
  command: string;
  weight: number;
  icon: string;

  constructor(props: Required<App>) {
    Object.assign(this, props);
  }
}
