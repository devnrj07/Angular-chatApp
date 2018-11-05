import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  // currentUser contains the current user
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  public setCurrentUser(newUser : User):void{  // 
    this.currentUser.next(newUser);
  }

  constructor() { }
}
export const userServivceInjectable: Array<any>=[UserService];
