import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-new-user',
  template: `
    <form #formRef="ngForm">
      <div class="new-user-form">
         <div>
            <label for="name">Name:</label>
            <input [class.error-message-border]="name.invalid && (name.dirty || name.touched)"
            ngModel name="name" #name="ngModel" (change)="log(name)" id="name" required
            minlength="3" maxlength="7"/>
            <div *ngIf="name.invalid && (name.dirty || name.touched)" class="error-messages">
               <div *ngIf="name?.errors.required">
                  Name is required.
               </div>
               <div *ngIf="name?.errors.minlength">
                  Minimum length is 3 charaters.
               </div>
               <div *ngIf="name?.errors.maxlength">
                  Maximum lenght is 10 characters.
               </div>
            </div>
         </div>
         <div>
            <label for="surname">Surname:</label>
            <input [class.error-message-border]="surname.invalid && (surname.dirty || surname.touched)"
            ngModel #surname="ngModel" name="surname" id="surname" pattern="[a-z]+" required/>
            <div *ngIf="surname.invalid && (surname.dirty || surname.touched)" class="error-messages">
               <div *ngIf="surname?.errors.required">
                  Surname is required.
               </div>
               <div *ngIf="surname?.errors.pattern">
                  Lowercase letters only
               </div>
            </div>
         </div>
         <div>
            <label for="email">Email:</label>
            <input email [class.error-message-border]="email.invalid && (email.dirty || email.touched)"
            ngModel #email="ngModel" name="email" id="email" required/>
            <div *ngIf="email.invalid && (email.dirty || email.touched)" class="error-messages">
               <div *ngIf="email?.errors.required">
                  Email is required.
               </div>
               <div *ngIf="email?.errors.email">
                  Email does not match
               </div>
            </div>
         </div>
         <div>
            <label for="password">Password:</label>
            <input [class.error-message-border]="password.invalid && (password.dirty || password.touched)"
            ngModel #password="ngModel" name="password" type="password" id="password" required/>
            <div *ngIf="password.invalid && (password.dirty || password.touched)" class="error-messages">
               <div *ngIf="password?.errors.required">
                  Password is required.
               </div>
            </div>
         </div>
         <div>
            <label for="surname">&nbsp;</label>
            <button  class="create-button"
            [disabled]="!formRef.valid" (click)="onSubmit(formRef); formRef.reset();"
            mat-raised-button color="accent">
               Create
            </button>
         </div>
      </div>
    </form>
  `,
  styles: [``]
})
export class NewUserComponent {
   constructor(private userService: UserService) {
   }
   onSubmit(formRef) {
      this.userService.addUser(formRef.value);
   }
   log(name) {
      console.log(name);
   }

}
