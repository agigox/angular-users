import { Component, Inject } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
   selector: 'app-edit-user',
   template: `
      <form>
         <div class="">
            <div class="">
               <label for="name" class="">Name:</label>
               <input type="text" id="name" name="name" class="" [(ngModel)]="data.name"/>
               <div>

               </div>
               <label for="surname" class="">Surname:</label>
               <input [(ngModel)]="data.surname" type="text" id="surname" name="surname" class="" />
            </div>

            <div class="">
               <label for="email" class="">Email:</label>
               <input [(ngModel)]="data.email" type="text" id="email" name="email" class="" />
            </div>

            <div class="">
               <label for="password" class="">Password:</label>
               <input [(ngModel)]="data.password" type="password" id="password" name="password" class=""/>
               <label for="surname" class="">&nbsp;</label>
            </div>

         </div>

      </form>
      <h1>Hello {{data.name }}</h1>
      <div mat-dialog-actions>
         <button mat-button (click)="onNoClick()">No Thanks</button>
         <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
      </div>
   `,
   styles: []
 })
 export class EditUserComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public data: any,
   public dialogRef: MatDialogRef<EditUserComponent>) {
   }
   onNoClick(): void {
      this.dialogRef.close();
    }



 }

@Component({
  selector: 'app-user-info',
  template: `
    <div class="users-holder" *ngIf="userInfo && userInfo.length">
      <div class="users-box">
         <div>Name</div>
         <div>Surname</div>
         <div>Email</div>
         <div>Password</div>
         <div>Delete/Edit</div>
      </div>
      <div *ngFor="let user of userInfo" class="users-box">
         <div>{{user?.name}}</div>
         <div>{{user.surname}}</div>
         <div>{{user.email}}</div>
         <div>{{user.password}}</div>
         <div>
            <mat-icon class="icons-actions" (click)="deleteUser(user.key)">delete</mat-icon>
            <mat-icon class="icons-actions" (click)="editUser(user)">edit</mat-icon>
         </div>
      </div>
      <div class="delete-all">
         <button (click)="deleteAllUsers()" mat-raised-button color="warn">Delete All Users</button>
      </div>
      <div *ngIf="userInfo && !userInfo.length">
         No User found
      </div>
    </div>
    <div *ngIf="errorData">
      {{ errorData}}
    </div>
  `,
  styles: []
})
export class UserInfoComponent {
   userInfo: Array<any>;
   errorData: string;
   constructor(private userService: UserService, public dialog: MatDialog) {
      // create observable that watch adding a new user
      const observable = this.userService.getStream();
      // implement observer object
      const observer = {
         next: (data) => this.userInfo = data,
         error: error => {
            if (error.code === 'PERMISSION_DENIED') {
                this.errorData = 'You do not have the permission to write to the datase';
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
  editUser(user) {
   const dialogRef = this.dialog.open(EditUserComponent, {
      width: '100%',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
         this.userService.updateUser(result);
      }
    });
  }

}
