import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="flex-container">
    <div class="flexed-item app-title">
      <h1>{{title}}</h1>
    </div>
    <div class="flexed-item">
      <app-form-new-user></app-form-new-user>
    </div>
    <div class="flexed-item">
      <app-user-info></app-user-info>
    </div>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Users Manager Dashboard';
}
