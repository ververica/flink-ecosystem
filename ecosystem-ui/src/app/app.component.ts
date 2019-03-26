import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flink-ecosystem';

  constructor(private router: Router) {}

  handleSearch(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    if (target.value) {
      this.router.navigate(['/search'], {
        queryParams: { query: target.value },
      });
      target.value = '';
    }
  }
}
