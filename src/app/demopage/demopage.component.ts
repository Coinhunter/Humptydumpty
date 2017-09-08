import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../services/google-analytics-events/google-analytics-events.service';

@Component({
  selector: 'app-demopage',
  templateUrl: './demopage.component.html',
  styleUrls: ['./demopage.component.css']
})
export class DemopageComponent implements OnInit {

  constructor(public googleAnalyticsEventsService: GoogleAnalyticsEventsService) { }

  ngOnInit() {
  }

  demoFun() {
    console.log('Emittar event av typ1');
    this.googleAnalyticsEventsService.emitEvent('typ1', 'testAction', 'testLabel', 10);
  }

  demoFun2() {
    console.log('Emittar event av typ2');
    this.googleAnalyticsEventsService.emitEvent('typ2', 'testAction', 'testLabel', 10);
  }

}
