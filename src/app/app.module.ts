import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserService  } from './user.service';
import { UserInfoComponent, EditUserComponent } from './user-info/user-info.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    UserInfoComponent,
    EditUserComponent
  ],
  entryComponents: [
   EditUserComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    HttpModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
