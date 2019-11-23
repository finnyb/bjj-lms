export class Navigation {
  index: string;
  start: number;
  count: number;
  url: string;

  constructor(props: Required<Navigation>) {
    Object.assign(this, props);
  }
}
