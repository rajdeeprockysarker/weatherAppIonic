import { TestBed } from '@angular/core/testing';

import { UIToastService } from './uitoast.service';

describe('UIToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UIToastService = TestBed.get(UIToastService);
    expect(service).toBeTruthy();
  });
  it('Show Toast on Runtime', () => {
    const service: UIToastService = TestBed.get(UIToastService);
    expect(service.presentToast()).toBeTruthy();
  });
  it('Show Toast With Option on Runtime ', () => {
    const service: UIToastService = TestBed.get(UIToastService);
    expect(service.presentToastWithOptions()).toBeTruthy();
  });
});
