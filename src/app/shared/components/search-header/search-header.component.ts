import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-search-header',
  templateUrl: './search-header.component.html',
})
export class SearchHeaderComponent implements OnInit {

  @Input('search-term') searchTerm: string;

  constructor() { }

  ngOnInit() {
  }
  clearSearch() {
    this.searchTerm = '';
  }

}
