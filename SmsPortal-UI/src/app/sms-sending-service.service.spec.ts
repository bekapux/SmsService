import { TestBed } from '@angular/core/testing';

import { SmsSendingServiceService } from './sms-sending-service.service';

describe('SmsSendingServiceService', () => {
  let service: SmsSendingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsSendingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
