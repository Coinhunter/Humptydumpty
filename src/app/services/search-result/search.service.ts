import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ResultContainerMapService } from '../result-container-map/result-container-map.service';
import { PbapiMatchningService } from '../pbapi-matchning/pbapi-matchning.service';
import { Profilkriterium } from '../../models/Profilkriterium.interface';

@Injectable()
export class SearchService {
  numberOfJobs: number;
  numberOfAds: number;
  numberOfAdsPerSection: number;
  resultContainerService: ResultContainerMapService = new ResultContainerMapService();
  searchCriteria: Array<Object>;

  // Last loaded segment (this is where the user was most recently browsing.)
  mostRecentlyLoadedSegment: number; // We always start by looking at the first one.

  constructor(private pbapiMatchning: PbapiMatchningService) {
    this.numberOfAdsPerSection = 25;
  }

  // Returns Promise
  newSearch(numberOfAdsPerSection: number, searchCriteria: Array<Object>) {
    // Clean out the old result.
    this.resultContainerService.clean();

    // Set up the new search, and perform it.
    this.numberOfAdsPerSection = numberOfAdsPerSection;
    this.searchCriteria = searchCriteria;
    this.mostRecentlyLoadedSegment = 1;
    return this.fetchSegment(1);
  }

  getNumberOfJobs() {
    if (this.numberOfJobs) {
      return this.numberOfJobs;
    } else {
      throw new Error('No value available, perform a search first.');
    }
  }

  getNumberOfAds() { return this.numberOfAds; }

  getNumberOfSections() {
    return Math.ceil(this.numberOfAds / this.numberOfAdsPerSection);
  }

  getNumberOfAdsPerSection() {
    return this.numberOfAdsPerSection;
  }

  getPaginatedResultArray() {
    // Simple, we only return the result for where we're standing.
    const result = [{
      'segmentIndex': this.mostRecentlyLoadedSegment,
      'segmentData': this.resultContainerService.getResultForIndex(this.mostRecentlyLoadedSegment)
    }];
    return result;
  }

  getLazyListResultArray() {
    // Start at the mostRecentlyLoadedSegment.
    // If we have loaded later or previous segments, show as many as are
    // available in an unbroken line.
    const result = [{
      'segmentIndex': this.mostRecentlyLoadedSegment,
      'segmentData': this.resultContainerService.getResultForIndex(this.mostRecentlyLoadedSegment)
    }];
    // Prepend backwards, until no more segments are available.
    // If there are holes in the list, and the first item is not index 1 once
    // all have been appended, the hasPreviousSegment using that index
    // will indicate that and can be called to determine whether to show
    // a "show previous"-button or something.. if that's what you're into.
    let ourVeryOwnLittleIndexPointer = this.mostRecentlyLoadedSegment;
    while (this.hasPreviousSegment(ourVeryOwnLittleIndexPointer)
      && this.isPreviousSegmentLoaded(ourVeryOwnLittleIndexPointer)) {
      ourVeryOwnLittleIndexPointer--;
      result.unshift({
        'segmentIndex': ourVeryOwnLittleIndexPointer,
        'segmentData': this.resultContainerService.getResultForIndex(ourVeryOwnLittleIndexPointer)
      });
    }
    // Do not append forwards. The user will have option to "show more".
    return result;
  }

  // Returns Promise : input index is 'where you are now' - next is the one after current pointer.
  loadNextSegment(index: number) {
    if (this.hasNextSegment(index)) {
      return this.fetchSegment(++index);
    } else {
      throw new Error('No next segment to fetch');
    }
  }

  hasNextSegment(index: number) {
    return (index < this.getNumberOfSections());
  }

  // Returns Promise : input index is 'where you are now' - previous is the one before current pointer.
  loadPreviousSegment(index: number) {
    if (this.hasPreviousSegment(index)) {
      return this.fetchSegment(--this.mostRecentlyLoadedSegment);
    } else {
      throw new Error('No previous segment to fetch');
    }
  }

  hasPreviousSegment(index: number) {
    return !(index <= 1);
  }

  private isPreviousSegmentLoaded(index: number) {
    return this.resultContainerService.hasResultForIndex(index - 1);
  }

  // Returns a Promise that gets resolved based on how the API call goes ^_^
  fetchSegment(index: number) {
    return new Promise((resolve, reject) => {
      if (!this.resultContainerService.hasResultForIndex(index)) {
        // Bygg ihop request
        const requestbody = {
          'startrad': this.calculateOffsetForIndex(index),
          'maxAntal': this.numberOfAdsPerSection,
          'matchningsprofil': {
            'profilkriterier': this.searchCriteria
          }
        }

        // TODO: Implement API functions and fire it off...
        // Return true when the result has been fetched and added.
        const criteria: Array<Profilkriterium> = [
          {
            'namn': 'Stockholm',
            'varde': '0180',
            'typ': 'KOMMUN'
          }
        ];

        const obsAds = this.pbapiMatchning
          .getMatchingAds(criteria, this.numberOfAdsPerSection, this.calculateOffsetForIndex(index))
          .then((result) => {
            this.numberOfAds = result.antalRekryteringsbehov;
            this.numberOfJobs = result.antalPlatser;
            this.resultContainerService.addResultForIndex(index, result.rekryteringsbehov);
            this.mostRecentlyLoadedSegment = index;
            resolve('Fetching complete');
          }, (error) => {
            resolve(error);
          });
      } else {
        resolve('Already loaded');
      }
    });
  }

  private calculateOffsetForIndex(index: number) {
    const offset = (index - 1) * this.numberOfAdsPerSection;
    if (offset >= this.numberOfAds) {
      throw new Error('Offset is larger than number of searchable ads');
    } else {
      return offset;
    }
  }
}
