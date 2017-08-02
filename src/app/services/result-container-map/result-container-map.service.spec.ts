import { TestBed, inject } from '@angular/core/testing';

import { ResultContainerMapService } from './result-container-map.service';

describe('ResultContainerMapService', () => {
  const result = [ {'id': 1}, {'id': 2} ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultContainerMapService]
    });
  });

  it('should be created', inject([ResultContainerMapService], (service: ResultContainerMapService) => {
    expect(service).toBeTruthy();
  }));

  it('should add section when asked to', () => {
  	const service = new ResultContainerMapService();
  	expect(service.hasResultForIndex(1)).toBe(false);
  	service.addResultForIndex(1, result);
  	expect(service.hasResultForIndex(1)).toBe(true);
  });

  it('should return a section of values when it exists', () => {
  	const service = new ResultContainerMapService();
  	service.addResultForIndex(1, result);
  	expect(service.getResultForIndex(1)).toEqual(result);
  });

  it('should throw an error when the requested section does not exist', () => {
  	const service = new ResultContainerMapService();
  	expect(() => {
  		service.getResultForIndex(1)
  	}).toThrow(new Error('No result stored for index 1'));
  });

  it('should throw an error when attempting to add the same section twice', () => {
  	const service = new ResultContainerMapService();
  	service.addResultForIndex(1, result);
  	expect(() => {
		service.addResultForIndex(1, result)
  	}).toThrow(new Error('Result already loaded for index 1'));
  });

  it('should clean out all previously loaded result when clear() is called', () => {
  	const service = new ResultContainerMapService();
  	service.addResultForIndex(1, result);
  	expect(service.hasResultForIndex(1)).toBe(true);
  	service.clean();
  	expect(service.hasResultForIndex(1)).toBe(false);
  });

});
