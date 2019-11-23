export class Stat {
  name: string;
  value: number;

  constructor(props: Required<Stat>) {
    Object.assign(this, props);
  }
}
