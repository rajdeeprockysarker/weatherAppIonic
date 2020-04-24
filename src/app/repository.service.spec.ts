import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';
import { HttpClient,HttpHandler } from '@angular/common/http';
import { isDefined } from '@angular/compiler/src/util';

describe('RepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
     HttpClient,
     HttpHandler
  ]
  }));

  it('should be created', () => {
    const service: RepositoryService = TestBed.get(RepositoryService);
    expect(service).toBeTruthy();
  });

  it('Check methods', () => {
    const service: RepositoryService = TestBed.get(RepositoryService);
    expect(service.getWeatherValueCurrent("Kolkata")).toBeTruthy();
    expect(service.getWeatherValueFiveDays("Kolkata")).toBeTruthy();
  });

  it('Check methods123', () => {
    const service: RepositoryService = TestBed.get(RepositoryService);   
    spyOn(service.getWeatherValueCurrent("Kolkata"), 'then').and.returnValue(undefined);
   
  });

});
