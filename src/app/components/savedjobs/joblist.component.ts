import { Component } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../types/job.type';

@Component({
    moduleId: module.id,
    selector: 'app-joblist',
    templateUrl: 'joblist.component.html',
    styleUrls: ['joblist.component.scss'],
    providers: [JobsService]
})

export class JoblistComponent  {

    jobs: Job[];

    numberOfJobs: number;
    numberOfJobsToApplyFor: number;
    numberOfJobsAppliedFor: number;
    numberOfJobsExpired: number;

    startSlide: number;
    activeSlide: number;

    joblistParam: string;

    showAnnouncements: boolean;

    constructor(private jobsService: JobsService) {
        this.joblistParam = 'all';

        this.startSlide = 0;
        this.activeSlide = this.startSlide + 1;

        this.showAnnouncements = false;
        this.jobsService.getLocalSelection().subscribe(jobs => {
            this.jobs = jobs;
            this.setJobNumbers();
        });
    }

    setJobNumbers() {
      this.numberOfJobs = this.jobs.length;
      this.numberOfJobsToApplyFor = 0;
      this.numberOfJobsExpired = 0;
      for (let i = 0, len = this.jobs.length; i < len; i++) {
        if (!this.jobs[i].sokt) {
          this.numberOfJobsToApplyFor++;
        }
        if (this.isDateBeforeToday(this.jobs[i].sistaAnsokningsdatum)) {
          this.numberOfJobsExpired++;
        }
      }
      this.numberOfJobsAppliedFor = this.jobs.length
                                    - this.numberOfJobsToApplyFor;

      if (this.joblistParam === 'toApplyFor') {
          this.numberOfJobs = this.numberOfJobsToApplyFor;
      } else if (this.joblistParam === 'applied') {
        this.numberOfJobs = this.numberOfJobsAppliedFor;
      } else if (this.joblistParam === 'expired') {
        this.numberOfJobs = this.numberOfJobsExpired;
      }
    }

    resetActiveSlide() {
      this.activeSlide = 1;
    }

    setSearchedStatus(id: number, status: boolean) {
      const findJob = this.jobs.find(job => job.id === id);
      if (findJob) {
        findJob.sokt = status;
      }
      this.setJobNumbers();
    }

    removeJob(id: number) {
      this.jobs = this.jobs.filter(job => job.id !== id);

      this.setJobNumbers();

      if (this.activeSlide > this.numberOfJobs) {
        this.activeSlide--;
      }

      if (this.numberOfJobs === 0) {
        this.showAnnouncements = false;
        this.joblistParam = 'all';
        this.setJobNumbers();
      }
    }

    removeAllJobs() {
      this.jobs.length = 0;
      this.setJobNumbers();
    }

    formatDate(dateNumber: number) {
      const month = new Array(12);
      month[0] = 'januari'; month[1] = 'februari'; month[2] = 'mars';
      month[3] = 'april'; month[4] = 'maj'; month[5] = 'juni';
      month[6] = 'juli'; month[7] = 'augusti'; month[8] = 'september';
      month[9] = 'oktober'; month[10] = 'november'; month[11] = 'december';

      const date = new Date(dateNumber);
      return date.getDate() + ' ' + month[date.getMonth()] + ' '
              + date.getFullYear();
    }

    getDateString(dateNumber: number) {
      const date = new Date(dateNumber);
      const today = new Date();
      const dayMs = 24 * 60 * 60 * 1000;
      const tomorrow = new Date(today.getTime() + dayMs);
      const yesterday = new Date(today.getTime() - dayMs);

      if (tomorrow.getFullYear() === date.getFullYear()
          && tomorrow.getMonth() === date.getMonth()
          && tomorrow.getDate() === date.getDate()) {
        return 'tomorrow';
      } else if (today.getFullYear() === date.getFullYear()
                  && today.getMonth() === date.getMonth()
                  && today.getDate() === date.getDate()) {
        return 'today';
      } else if (yesterday.getFullYear() === date.getFullYear()
              && yesterday.getMonth() === date.getMonth()
              && yesterday.getDate() === date.getDate()) {
        return 'yesterday';
      } else {
        return 'other';
      }
    }

    getFormattedDate(dateNumber: number, includeTime?: boolean) {
      const day = this.getDateString(dateNumber);
      if (day === 'other') {
        return this.formatDate(dateNumber);
      } else if (day === 'today') {
          if (!includeTime) {
            return 'idag';
          } else {
            const time = new Date(dateNumber);
            return 'idag, ' + this.addZero(time.getHours()) + ':'
                    + this.addZero(time.getMinutes());
          }
      } else if (day === 'yesterday') {
          return 'igår';
      } else {
        return 'imorgon';
      }
    }

    addZero(i) {
      if (i < 10) {
          i = '0' + i;
      }
      return i;
    }

    isDateBeforeToday(date: number) {
      return new Date(new Date(date)) < new Date(new Date().toDateString());
    }

    isDateOver90DaysAgo(date: number) {
      const today = new Date();
      const expirationDate = new Date(date);
      expirationDate.setDate(expirationDate.getDate() + 9);
      return (today > expirationDate);
    }

    openAnnouncement(id: number, index: number, isRemoved: boolean) {
      if (!isRemoved) {
        this.activeSlide = index + 1;
        this.showAnnouncements = true;
      }
    }

    convertToHtml(text: string) {
      return text.replace(/\n/g, '<br />');
    }
    removeLineBreaks(text: string) {
      return text.replace(/\r\n/g, '/');
    }
    updateActiveSlide(direction: string) {
      if (direction === 'next') {
        if (this.activeSlide < this.numberOfJobs) {
          this.activeSlide++;
        } else {
          this.activeSlide = 1;
        }
      } else if (direction === 'prev') {
        if (this.activeSlide > 1) {
          this.activeSlide--;
        } else {
          this.activeSlide = this.numberOfJobs;
        }
      }
    }

    topFunction() {
        document.body.scrollTop = 0; // For Chrome, Safari and Opera
        document.documentElement.scrollTop = 0; // For IE and Firefox
    }
}
