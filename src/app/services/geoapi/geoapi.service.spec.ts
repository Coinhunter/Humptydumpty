import { NgModule } from '@angular/core';
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GeoapiService } from './geoapi.service';
import { Profilkriterium } from '../../models/Profilkriterium';
import { HttpErrorResponse } from '@angular/common/http/src/response';

describe('GeoapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        GeoapiService
      ]
    });
  });

  it('should be created', inject([HttpClientModule, GeoapiService], (http: HttpClientModule, service: GeoapiService) => {
    expect(service).toBeTruthy();
  }));

  // Any city and number would do, just making sure the API answers proprtly..
  it('should contain more than 30 entries for "Skara" - 532.', async(inject([HttpClientModule, GeoapiService], (http: HttpClientModule, service: GeoapiService) => {
    service.getOrtByPostnummer('532').subscribe((result) => {
      console.log(result);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(30);
    });
  })));

  it('should throw an error when supplying too short filter', async(inject([HttpClientModule, GeoapiService], (http: HttpClientModule, service: GeoapiService) => {
    service.getOrtByPostnummer('53').subscribe((data) => {
      fail('Unwanted code block');
    }, (err:HttpErrorResponse) => {
      console.log(err);
      
      err.statusText

      expect(err.message).toEqual('Tre till fem siffror måste anges.');
    });
  })));


});
