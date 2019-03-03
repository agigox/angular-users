import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-info',
  template: `
    <div>
      <div class="overflow-auto">
        <div *ngIf="userInfo && userInfo.length">
          <table class="f6 w-100 mw8 ba"  cellspacing="0">
            <thead>
              <tr class="stripe-dark">
                <th class="fw6 tl pa2 ba bg-white">Name</th>
                <th class="fw6 tl pa2 ba bg-white">Surname</th>
                <th class="fw6 tl pa2 ba bg-white">Email</th>
                <th class="fw6 tl pa2 ba bg-white">Password</th>
                <th class="fw6 tl pa2 ba bg-white">Delete</th>
              </tr>
            </thead>
            <tbody class="lh-copy">
              <tr *ngFor="let user of userInfo" class="stripe-dark">
                <td class="pa2 ba">{{user.name}}</td>
                <td class="pa2 ba">{{user.surname}}</td>
                <td class="pa2 ba">{{user.email}}</td>
                <td class="pa2 ba">{{user.password}}</td>
                <th class="fw6 tl pa2 ba bg-white">
                  <button (click)="deleteUser(user.key)">Delete</button>
                </th>
              </tr>
            </tbody>
          </table>
          <div>
            <button (click)="deleteAllUsers()">Delete All Users</button>
          </div>
        </div>
        <div *ngIf="userInfo && !userInfo.length">
          No User found
        </div>
      </div>
    </div>
    <div *ngIf="errorData">
      {{ errorData}}
    </div>
  `,
  styles: []
})
export class UserInfoComponent {
   userInfo: Array<object>;
   errorData: string;
   constructor( private userService: UserService ) {
      // create observable that watch adding a new user
      const observable = this.userService.getStream();
      // implement observer object
      const observer = {
         next: (data) => this.userInfo = data,
         error: error => {
            if (error.code === 'PERMISSION_DENIED') {
                this.errorData = 'You do not have the permission to write to the database';
            }
      },
      complete: () => console.log('operation completed')
    }
    // Execute with the observer object
    observable.subscribe(observer);
  }

  deleteUser(key: string) {
    this.userService.deleteUser(key);
  }

  deleteAllUsers() {
    this.userService.deleteAllUsers();
  }

}
