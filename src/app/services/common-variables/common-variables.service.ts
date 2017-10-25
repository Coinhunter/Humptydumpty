import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class CommonVariablesService {
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isloggedIn = this.isLoggedInSource.asObservable();

  constructor() { }

  changeLoggedIn(value: boolean) {
    console.log('ServiceChangeLogegdIn: ' + value);
    this.isLoggedInSource.next(value);
    console.log(this.isLoggedInSource);
  }
}
