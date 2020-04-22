import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';
import { HttpClient,HttpHandler } from '@angular/common/http';

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

});
