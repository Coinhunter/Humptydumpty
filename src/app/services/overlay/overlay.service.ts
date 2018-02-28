import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Overlay } from 'app/models/Overlay';

@Injectable()
export class OverlayService {

  constructor() { }

  overlay = new Subject<Overlay>();

  enableOverlay(target) {
    this.overlay.next(new Overlay(true, target));
  }

  disableOverlay(target) {
    this.overlay.next(new Overlay(false, target));
  }

  getOverlaySubject():Subject<Overlay>{
    return this.overlay;
  }

}
