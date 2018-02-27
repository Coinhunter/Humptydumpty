import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OverlayService {

  constructor() { }

  overlay = new Subject<object>();

  enableOverlay(target) {
    this.overlay.next({ status: true, target });
  }

  disableOverlay(target) {
    this.overlay.next({ status: false, target });
  }

  getOverlayStatus():Subject<object>{
    return this.overlay;
  }

}
