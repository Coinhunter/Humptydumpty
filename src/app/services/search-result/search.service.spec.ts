import { TestBed, inject, async } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { SearchService } from './search.service';
import { PbapiMatchningService } from '../pbapi-matchning/pbapi-matchning.service';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Profilkriterium } from '../../models/Profilkriterium';

const data = require('./datafixture.json');
const criteria: Array<Profilkriterium> = [
  {
    'namn': 'Stockholm',
    'varde': '0180',
    'typ': 'KOMMUN'
  }
];

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],      
      providers: [
        SearchService,
        PbapiMatchningService
      ]
    });
  });  

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));


  it('should import testfixture data', inject([SearchService], (service: SearchService) => {
    expect(data.antalPlatser).toBeDefined();
  }));


  it('should throw weeo when attempting to get number of jobs without first searching', async(inject([SearchService], (service: SearchService) => {
    expect(() => {
      service.getNumberOfJobs();
    }).toThrow(new Error('No value available, perform a search first.'));
  })));

  it('should properly set the number of jobs when performing a new search', async(inject([SearchService], (service: SearchService) => {
    service.newSearch(25, criteria).then((result) => {
      expect(service.getNumberOfJobs()).toEqual(jasmine.any(Number));
    });
  })));

  it('should properly set the number of ads when performing a new search', async(inject([SearchService], (service: SearchService) => {
    service.newSearch(25, criteria).then((result) => {
      expect(service.getNumberOfAds()).toEqual(jasmine.any(Number));
    });
  })));


  it('should have set the ads of the first section when performing a new search', async(inject([SearchService], (service: SearchService) => {
    service.newSearch(25, criteria).then((result) => {
      expect(service.resultContainerService.getResultForIndex(1).length).toEqual(service.getNumberOfAdsPerSection());
      expect(() => {
        service.resultContainerService.getResultForIndex(2);
      }).toThrow(new Error('No result stored for index 2'));
    });
  })));

  it('should have set the next section of ads when calling loadNextSegment()', async(inject([SearchService], (service: SearchService) => {
    service.newSearch(25, criteria).then((section1Result) => {
      expect(section1Result).toEqual('Fetching complete');
      service.loadNextSegment(service.mostRecentlyLoadedSegment).then((section2Result) => {
        expect(section1Result).toEqual('Fetching complete');
        expect(service.resultContainerService.hasResultForIndex(2)).toBe(true);
        service.loadNextSegment(service.mostRecentlyLoadedSegment).then((section3Result) => {
          expect(section1Result).toEqual('Fetching complete');
          expect(service.resultContainerService.hasResultForIndex(3)).toBe(true);
        });
      });
    });
  })));

  it('should throw an error if attempting to load more segments than exists', async(inject([SearchService], (service: SearchService) => {
    service.newSearch(25, criteria).then((section1Result) => {
      expect(section1Result).toEqual('Fetching complete');
      // Set the most recently loaded one to one before end of range.
      service.mostRecentlyLoadedSegment = service.getNumberOfSections()-1;
      service.loadNextSegment(service.mostRecentlyLoadedSegment).then((lastWorkingLoadResult) => {
        expect(section1Result).toEqual('Fetching complete');
        // Check that the result for the last set was put into the resultcontainer.
        expect(service.resultContainerService.hasResultForIndex(service.getNumberOfSections()));
        // Now try to load the next set, which should not exist. And should throw the error.
        expect(() => {
          service.loadNextSegment(service.mostRecentlyLoadedSegment)
        }).toThrow(new Error('No next segment to fetch'));
      });
    });
  })));


  it('should have loaded the previous section of ads when calling loadPreviousSegment()', async(inject([SearchService], (service: SearchService) => {
    service.newSearch(25, criteria).then((result1) => {
      expect(result1).toEqual('Fetching complete');
      //Fetch the last segment in the series...
      service.fetchSegment(service.getNumberOfSections()).then((responseMax) => {
        expect(responseMax).toEqual('Fetching complete');
        expect(service.resultContainerService.hasResultForIndex(service.getNumberOfSections())).toBe(true);
        expect(service.resultContainerService.hasResultForIndex(service.getNumberOfSections()-1)).toBe(false);
        expect(service.hasPreviousSegment(service.mostRecentlyLoadedSegment)).toBe(true);
        service.loadPreviousSegment(service.mostRecentlyLoadedSegment).then((previous) => {
          expect(previous).toEqual('Fetching complete');
          expect(service.resultContainerService.hasResultForIndex(service.getNumberOfSections()-1)).toBe(true);
        });
      });
    });
  })));

  it('should not fire requests for already loaded segments', async(inject([SearchService], (service: SearchService) => {
    service.newSearch(25, criteria).then((result1) => {
      expect(result1).toEqual('Fetching complete');
      expect(service.resultContainerService.hasResultForIndex(1)).toBe(true);      
      service.fetchSegment(1).then((resultAlreadyFetched) => {
        expect(resultAlreadyFetched).toEqual('Already loaded');
      });
    });
  })));

  
  it('should throw an error if attempting to load segments before index 1', async(inject([SearchService], (service: SearchService) => {
    service.newSearch(25, criteria).then((section1Result) => {
      expect(section1Result).toEqual('Fetching complete');
      expect(() => {
        service.loadPreviousSegment(service.mostRecentlyLoadedSegment);
      }).toThrow(new Error('No previous segment to fetch'));
    });
  })));


  it('should return the resultset for mostRecentlyLoadedSegment when asked for paginated result', async(inject([SearchService], (service: SearchService) => {
    // Perform initial search..
    service.newSearch(25, criteria).then((result) => {
      // Expect the result from that search to be returned when asking for the paginated result.
      expect(result).toEqual('Fetching complete');
      expect(service.getPaginatedResultArray()[0]['segmentIndex']).toEqual(1);
      // Load the next segment.
      service.loadNextSegment(service.mostRecentlyLoadedSegment).then((nextresult) => {
        // Expect that data to be the one that gets returned when asking for the paginated result.
        expect(service.getPaginatedResultArray()[0]['segmentIndex']).toEqual(2);
        // Load the previous segment again, make sure that's the one that gets returned.
        service.loadPreviousSegment(service.mostRecentlyLoadedSegment).then((previousResult) => {
          expect(previousResult).toEqual('Already loaded');
          expect(service.getPaginatedResultArray()[0]['segmentIndex']).toEqual(1);
          // Finally make sure we get an error when we're trying to load indicies < 1.
          expect( () => {
            service.loadPreviousSegment(service.mostRecentlyLoadedSegment);
          }).toThrow(new Error('No previous segment to fetch'));
        });
      });
    });
  })));

  it('should return the correct resultset for getLazyListResultArray', async(inject([SearchService], (service: SearchService) => {
    service.newSearch(25, criteria).then((result) => {
      service.loadNextSegment(service.mostRecentlyLoadedSegment).then((nextResult) => {
        expect(service.getLazyListResultArray().length).toEqual(2);
      });
    });
  })));

  it('should return the correct resultset for getLazyListResultArray when it has holes in it', async(inject([SearchService], (service: SearchService) => {
    service.newSearch(25, criteria).then((result) => {
      service.fetchSegment(3).then((result) => {
        expect(service.mostRecentlyLoadedSegment).toEqual(3);
        service.loadNextSegment(service.mostRecentlyLoadedSegment).then((previous) => {
          expect(service.mostRecentlyLoadedSegment).toEqual(4);
          service.loadNextSegment(service.mostRecentlyLoadedSegment).then((previous2) => {
            expect(service.resultContainerService.hasResultForIndex(1)).toBe(true);
            expect(service.resultContainerService.hasResultForIndex(2)).toBe(false);
            expect(service.resultContainerService.hasResultForIndex(3)).toBe(true);
            expect(service.resultContainerService.hasResultForIndex(4)).toBe(true);
            expect(service.resultContainerService.hasResultForIndex(5)).toBe(true);
            expect(service.mostRecentlyLoadedSegment).toEqual(5);
            // Vi har resultat för 1, 3, 4, 5. När vi nu ber om listan borde vi bara få 3,4,5.
            expect(service.getLazyListResultArray().length).toEqual(3);
            expect(service.getLazyListResultArray()[0]['segmentIndex']).toEqual(3);
            expect(service.getLazyListResultArray()[1]['segmentIndex']).toEqual(4);
            expect(service.getLazyListResultArray()[2]['segmentIndex']).toEqual(5);
          });
        });
      });
    });
  })));

});
