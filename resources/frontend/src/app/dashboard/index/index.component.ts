import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
