import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Filter } from './filter';
import { FilterType } from './filter-type.enum';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() filter = new EventEmitter<Filter>();

  filterTypes: FilterType[] = [FilterType.NAME, FilterType.YEAR];

  selectedFilter: FilterType;

  constructor() {}

  ngOnInit() {
    this.selectedFilter = this.filterTypes[0];
  }

  onKey(value: string) {
    this.filter.emit(new Filter(value, this.selectedFilter));
  }
}
