import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class CommonVariablesService {
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isloggedIn = this.isLoggedInSource.asObservable();

  constructor() {
    this.changeLoggedIn(true);
  }

  changeLoggedIn(value: boolean) {
    this.isLoggedInSource.next(value);
  }
}
