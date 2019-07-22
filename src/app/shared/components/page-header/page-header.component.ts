import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-page-header',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent implements OnInit {

  constructor() { }

  @Input('page-title') pageTitle: string;
  @Input('show-button') showButton: boolean = true;
  @Input('button-class') buttonClass: string;
  @Input('button-text') buttonText: string;
  @Input('button-link') buttonLink: string;

  ngOnInit() {
  }

}
