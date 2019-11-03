import { FilterType } from './filter-type.enum';

export class Filter {
  constructor(public value: string, public type: FilterType) {}
}
