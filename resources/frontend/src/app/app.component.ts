import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
        './_services/modal/modal.component.scss',
  ]
})
export class AppComponent {
    title = 'frontend';
    base = environment.currentUrl;
  constructor(
    private router: Router
  ) {
    this.title = 'false';
  }
}
