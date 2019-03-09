import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  subject: Subject<any>;
  usersRef: AngularFireList<any>;
  users: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.subject = new Subject<any>();
    this.usersRef = this.db.list('users');
    console.log(this.usersRef);
    this.getUsers();
    /*
    this.updateUser('1', 'blabla');
    this.addUser('hamid');
    this.deleteUser('-LZzrMeW5O3bqKW3d37r');
    */
    // this.deleteAllUsers();
  }

  getUsers() {
    // Use snapshotChanges().map() to store the key
    // create an observable
    this.users = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    // create observer object
    const observer = {
      next: data => this.subject.next(data),
      error: error => this.subject.error(error),
    }
    // Execute with the observer object
    this.users.subscribe(observer);
  }

  updateUser(user: any) {
    this.usersRef.update(user.key, user);
  }
  addUser(user) {
    this.usersRef.push(user);
  }
  deleteUser(key: string) {
    this.usersRef.remove(key);
  }
  deleteAllUsers() {
    this.usersRef.remove();
  }

  registerNewUser(data: any) {
    console.log(data);
    // this.subject.next(data);
  }

  getStream() {
    return this.subject;
  }

}
