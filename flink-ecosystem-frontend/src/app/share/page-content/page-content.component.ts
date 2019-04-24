import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss'],
})
export class PageContentComponent implements OnInit {
  @Input('title') title: string;
  constructor() {}

  ngOnInit() {}
}
