import { Component, OnInit } from '@angular/core';
import { YrkenService } from '../../services/yrken/yrken.service';
import { Yrkesomrade } from '../../models/Yrkesomrade.interface';
import { Yrkesgrupp } from '../../models/Yrkesgrupp.interface';
import { Yrke } from '../../models/Yrke.interface';

@Component({
  selector: 'app-generatejobareas',
  templateUrl: './generatejobareas.component.html',
  styleUrls: ['./generatejobareas.component.scss'],
  providers: [
    YrkenService
  ]
})
export class GeneratejobareasComponent implements OnInit {

  yrkesomraden: Array<Yrkesomrade>;
  result: string;

  constructor(private yrkenService: YrkenService) {
    this.yrkenService.getAllJobAreas().then(data => {
      this.yrkesomraden = data;
      this.getJobGroupsForJobAreas();
    });
  }

  ngOnInit() {
  }
  getJobGroupsForJobAreas() {
    for (const omrade of this.yrkesomraden) {
      this.yrkenService.getJobGroupsForJobArea(omrade.id.toString()).then(data => {
        omrade.yrkesgrupper = data;
        for (const grupp of omrade.yrkesgrupper) {
          this.yrkenService.getJobsForJobGroup(grupp.id.toString()).then(data2 => {
            grupp.yrken = data2;
            this.result = JSON.stringify(this.yrkesomraden, undefined, 2);
          });
        }
      });
    }
  }
  getJobsForJobGroup(jobGroup: Yrkesgrupp) {
    this.yrkenService.getJobsForJobGroup(jobGroup.id.toString()).then(data => {
      jobGroup.yrken = data;
    });
  }
  printJsonInNewTag() {
    const url = 'data:text/json;charset=utf8,' + encodeURIComponent(this.result);
    window.open(url, '_blank');
    window.focus();
  }
}
