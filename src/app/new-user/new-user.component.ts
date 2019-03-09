import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-new-user',
  template: `
    <form #formRef="ngForm">
      <div class="new-user-form">
         <div>
            <label for="name" class="">Name:</label>
            <input type="text" id="name" name="name" ngModel required class="" />
         </div>
         <div>
            <label for="surname" class="">Surname:</label>
            <input type="text" id="surname" name="surname" ngModel required class="" />
         </div>
         <div>
            <label for="email" class="">Email:</label>
            <input type="text" id="email" name="email" ngModel required class="" />
         </div>
         <div>
            <label for="password" class="">Password:</label>
            <input type="password" id="password" name="password" ngModel required class=""/>
         </div>
         <div>
            <label for="surname" class="">&nbsp;</label>
            <button (click)="onSubmit(formRef.value); formRef.reset();" [disabled]="!formRef.valid"
         class="">Create</button>
         </div>
      </div>
    </form>
  `,
  styles: [``]
})
export class NewUserComponent {

   constructor(private userService: UserService) {
   }
  onSubmit(data) {
    this.userService.addUser(data.email, data.name, data.password, data.surname);
  }

}
