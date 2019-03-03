import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { FormNewUserComponent } from './form-new-user/form-new-user.component';
import { UserService  } from './user.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent,
    FormNewUserComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    HttpModule,
    AngularFireDatabaseModule
  ],
  providers: [UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }