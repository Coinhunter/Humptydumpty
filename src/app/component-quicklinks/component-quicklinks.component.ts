import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-quicklinks',
  templateUrl: './component-quicklinks.component.html',
  styleUrls: ['./component-quicklinks.component.scss']
})
export class ComponentQuicklinksComponent implements OnInit {

  quicklinks = [
    {
      headline: 'Populära jobbplaceringar',
      items: [
        {
          name: 'Göteborg',
          tags: [1235],
        },
        {
          name: 'Stockholm',
          tags: [1234],
        },
        {
          name: 'Malmö',
          tags: [1233],
        },
        {
          name: 'Hela Sverige',
          tags: [],
        },
      ]
    },
    {
      headline: 'Populära yrken',
      items: [
        {
          name: 'Hotell & Restaurang',
          tags: [],
        },
        {
          name: 'Administration',
          tags: [],
        },
        {
          name: 'Hälsa och Sjukvård',
          tags: [],
        },
        {
          name: 'Data och IT',
          tags: [],
        },                        
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
