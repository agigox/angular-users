import { Component, Inject } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
   selector: 'app-edit-user',
   template: `
      <form #editUser="ngForm" class="edit-user-form">
         <input type="hidden" name="key" [ngModel]="data.key" />
         <label for="name">Name:</label>
         <input type="text" id="name" name="name" [ngModel]="data.name"/>
         <label for="surname">Surname:</label>
         <input type="text" id="surname" name="surname" [ngModel]="data.surname" />
         <label for="email">Email:</label>
         <input type="text" id="email" name="email" [ngModel]="data.email"  />
         <label for="password">Password:</label>
         <input type="password" id="password" name="password" [ngModel]="data.password" />
         <div mat-dialog-actions class="dialog-buttons">
            <button mat-raised-button (click)="onNoClick()" color="warn">Cancel</button>
            <button (click)="onSubmit(editUser);"
            mat-raised-button [mat-dialog-close]="data" cdkFocusInitial color="accent">Update
            </button>
         </div>
      </form>
   `,
   styles: []
 })
 export class EditUserComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public data: any,
   public dialogRef: MatDialogRef<EditUserComponent>,
   private userService: UserService) {
   }
   onNoClick(): void {
      this.dialogRef.close();
   }
   onSubmit(form) {
      this.userService.updateUser(form.value);
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
    <div class="users-spinner" *ngIf="loadingSnipper">
      <mat-spinner></mat-spinner>
    </div>


  `,
  styles: []
})
export class UserInfoComponent {
   userInfo: Array<any>;
   errorData: string;
   loadingSnipper = true;
   constructor(private userService: UserService, public dialog: MatDialog) {
      // create observable that watch adding a new user
      const observable = this.userService.getStream();
      // implement observer object
      const observer = {
         next: (data) => {
            this.loadingSnipper = false
            this.userInfo = data
         },
         error: error => {
            if (error.code === 'PERMISSION_DENIED') {
               this.loadingSnipper = false
                this.errorData = 'You do not have the permission to write to the datase';
            }
         }
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
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
       /*
      console.log(result);
      if (result) {
         this.userService.updateUser(result);
      }
      */
    });
  }

}
