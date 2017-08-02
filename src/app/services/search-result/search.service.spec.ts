import { TestBed, inject, async } from '@angular/core/testing';

import { SearchService } from './search.service';

const data = require('./datafixture.json');

describe('SearchService', () => {

  let service: SearchService;

  beforeEach(async(() => {
    service = new SearchService()
  }));

  it('should import testfixture data', () => {
  	expect(data.antalPlatser).toBeDefined();
  });

  it('should properly set the number of jobs when performing a new search', () => {
    service.newSearch(25, []).then((result) => {
      expect(service.getNumberOfJobs()).toEqual(4711);
    });
  });

  it('should properly set the number of ads when performing a new search', () => {
    service.newSearch(25, []).then((result) => {
      expect(service.getNumberOfAds()).toEqual(1337);      
    });
  });

  it('should have set the ads of the first section when performing a new search', () => {
    service.newSearch(25, []).then((result) => {
      expect(service.resultContainerService.getResultForIndex(1)).toEqual([
        {
          'key': 1,
          'value': 'one'
        },
        {
          'key': 2,
          'value': 'two'
        }
      ]);
    });
  });

  it('should have set the next section of ads when calling loadNextSegment()', () => {
    service.newSearch(25, []).then((section1Result) => {
      expect(section1Result).toEqual('Fetching completed');
      service.loadNextSegment(service.mostRecentlyLoadedSegment).then((section2Result) => {
        expect(section1Result).toEqual('Fetching completed');
        expect(service.resultContainerService.hasResultForIndex(2)).toBe(true);
        service.loadNextSegment(service.mostRecentlyLoadedSegment).then((section3Result) => {
          expect(section1Result).toEqual('Fetching completed');
          expect(service.resultContainerService.hasResultForIndex(3)).toBe(true);
        });
      });
    });
  });

  it('should throw an error if attempting to load more segments than exists', () => {
    service.newSearch(25, []).then((section1Result) => {
      expect(section1Result).toEqual('Fetching completed');
      // Set the most recently loaded one to one before end of range.
      service.mostRecentlyLoadedSegment = service.getNumberOfSections()-1;
      service.loadNextSegment(service.mostRecentlyLoadedSegment).then((lastWorkingLoadResult) => {
        expect(section1Result).toEqual('Fetching completed');
        // Check that the result for the last set was put into the resultcontainer.
        expect(service.resultContainerService.hasResultForIndex(service.getNumberOfSections()));
        // Now try to load the next set, which should not exist. And should throw the error.
        expect(() => {
          service.loadNextSegment(service.mostRecentlyLoadedSegment)
        }).toThrow(new Error('No next segment to fetch'));
      });
    });
  });

  it('should have loaded the previous section of ads when calling loadPreviousSegment()', () => {
    service.newSearch(25, []).then((result1) => {
      expect(result1).toEqual('Fetching completed');
      service.mostRecentlyLoadedSegment = 10;
      service.fetchSegment(10).then((result10) => {
        expect(result10).toEqual('Fetching completed');
        expect(service.resultContainerService.hasResultForIndex(10)).toBe(true);
        expect(service.resultContainerService.hasResultForIndex(9)).toBe(false);
        expect(service.hasPreviousSegment(service.mostRecentlyLoadedSegment)).toBe(true);
        service.loadPreviousSegment(service.mostRecentlyLoadedSegment).then((previous) => {
          expect(previous).toEqual('Fetching completed');
          expect(service.resultContainerService.hasResultForIndex(9)).toBe(true);
        });
      });
    });
  });

  it('should not fire requests for already loaded segments', () => {
    service.newSearch(25, []).then((result1) => {
      expect(result1).toEqual('Fetching completed');
      expect(service.resultContainerService.hasResultForIndex(1)).toBe(true);      
      service.fetchSegment(1).then((resultAlreadyFetched) => {
        expect(resultAlreadyFetched).toEqual('Already loaded');
      });
    });
  });

  it('should throw an error if attempting to load segments before index 1', () => {
    service.newSearch(25, []).then((section1Result) => {
      expect(section1Result).toEqual('Fetching completed');
      expect(() => {
        service.loadPreviousSegment(service.mostRecentlyLoadedSegment);
      }).toThrow(new Error('No previous segment to fetch'));
    });
  });

  it('should return the resultset for mostRecentlyLoadedSegment when asked for paginated result', () => {
    // Perform initial search..
    service.newSearch(25, []).then((result) => {
      // Expect the result from that search to be returned when asking for the paginated result.
      expect(result).toEqual('Fetching completed');
      expect(service.getPaginatedResultArray()).toEqual([
        {
          'segmentIndex': 1,
          'segmentData': [
            {
              'key': 1,
              'value': 'one'
            },
            {
              'key': 2,
              'value': 'two'
            }          
          ]
        }
      ]);
      // Load the next segment.
      service.loadNextSegment(service.mostRecentlyLoadedSegment).then((nextresult) => {
        // Expect that data to be the one that gets returned when asking for the paginated result.
        expect(service.getPaginatedResultArray()).toEqual([
          {
            'segmentIndex': 2,
            'segmentData': [
              {
                'key': 1,
                'value': 'one'
              },
              {
                'key': 2,
                'value': 'two'
              }          
            ]
          }
        ]);
        // Load the previous segment again, make sure that's the one that gets returned.
        service.loadPreviousSegment(service.mostRecentlyLoadedSegment).then((previousResult) => {
          expect(previousResult).toEqual('Already loaded');
          expect(service.getPaginatedResultArray()).toEqual([
            {
              'segmentIndex': 1,
              'segmentData': [
                {
                  'key': 1,
                  'value': 'one'
                },
                {
                  'key': 2,
                  'value': 'two'
                }          
              ]
            }
          ]);
          // Finally make sure we get an error when we're trying to load indicies < 1.
          expect( () => {
            service.loadPreviousSegment(service.mostRecentlyLoadedSegment);
          }).toThrow(new Error('No previous segment to fetch'));
        });
      });
    });
  });

  it('should return the correct resultset for getLazyListResultArray', () => {
    service.newSearch(25, []).then((result) => {
      service.loadNextSegment(service.mostRecentlyLoadedSegment).then((nextResult) => {
        expect(service.getLazyListResultArray()).toEqual([
          {
            'segmentIndex': 1,
            'segmentData': [
              {
                'key': 1,
                'value': 'one'
              },
              {
                'key': 2,
                'value': 'two'
              }          
            ]
          },
          {
            'segmentIndex': 2,
            'segmentData': [
              {
                'key': 1,
                'value': 'one'
              },
              {
                'key': 2,
                'value': 'two'
              }          
            ]
          }          
        ]);
      });
    });
  });

  it('should return the correct resultset for getLazyListResultArray when it has holes in it', () => {
    service.newSearch(25, []).then((result) => {
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
            expect(service.getLazyListResultArray()).toEqual([
              {
                'segmentIndex': 3,
                'segmentData': [
                  {
                    'key': 1,
                    'value': 'one'
                  },
                  {
                    'key': 2,
                    'value': 'two'
                  }          
                ]
              },
              {
                'segmentIndex': 4,
                'segmentData': [
                  {
                    'key': 1,
                    'value': 'one'
                  },
                  {
                    'key': 2,
                    'value': 'two'
                  }          
                ]
              },
              {
                'segmentIndex': 5,
                'segmentData': [
                  {
                    'key': 1,
                    'value': 'one'
                  },
                  {
                    'key': 2,
                    'value': 'two'
                  }          
                ]
              }
            ]);
          });
        });
      });
    });
  });

});
