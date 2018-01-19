import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-search',
  templateUrl: './component-search.component.html',
  styleUrls: ['./component-search.component.scss']
})
export class ComponentSearchComponent implements OnInit {

  antalLedigaJobb: string;

  constructor() { 
    this.antalLedigaJobb = '85 323';
  }

  ngOnInit() {
  }

}
