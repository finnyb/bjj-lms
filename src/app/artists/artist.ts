export class Artist {
  id: string;
  name: string;
  index: string;

  constructor(props: Required<Artist>) {
    Object.assign(this, props);
  }
}
