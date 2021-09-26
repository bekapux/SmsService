import { TestBed } from '@angular/core/testing';

import { Jwt.Interceptor.TsInterceptor } from './jwt.interceptor.ts.interceptor';

describe('Jwt.Interceptor.TsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Jwt.Interceptor.TsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Jwt.Interceptor.TsInterceptor = TestBed.inject(Jwt.Interceptor.TsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
