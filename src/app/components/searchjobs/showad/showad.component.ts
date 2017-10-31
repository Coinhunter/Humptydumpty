import { Component, OnInit } from '@angular/core';
import { SearchJobsCommonVariablesService } from '../../../services/search-jobs-common-variables/search-jobs-common-variables.service';
import { CommonVariablesService } from '../../../services/common-variables/common-variables.service';
import { Job } from '../../../types/job.type';

@Component({
  selector: 'app-showad',
  templateUrl: './showad.component.html',
  styleUrls: ['./showad.component.scss']
})
export class ShowadComponent implements OnInit {

  currentJob: Job;
  showAdView: boolean;
  constructor(private sjcvs: SearchJobsCommonVariablesService, private commonVariablesService: CommonVariablesService) { }

  ngOnInit() {
    this.sjcvs.currentJob.subscribe(currentJob => this.currentJob = currentJob);
    this.sjcvs.showAdView.subscribe(showAdView => this.showAdView = showAdView);
  }

  hideAd() {
    this.sjcvs.setShowAdView(false);
  }

  getFormattedDate(dateNumber: number, includeTime?: boolean) {
    return this.commonVariablesService.getFormattedDate(dateNumber, includeTime);
  }
  isDateBeforeToday(dateNumber: number) {
    return this.commonVariablesService.isDateBeforeToday(dateNumber);
  }
}
