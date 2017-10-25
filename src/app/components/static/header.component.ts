import { Component, OnInit } from '@angular/core';
import { CommonVariablesService } from '../../services/common-variables/common-variables.service';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private commonVariablesService: CommonVariablesService) {

  }

  ngOnInit() {
    this.commonVariablesService.isloggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }
}
