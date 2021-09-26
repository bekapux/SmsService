import { TestBed } from '@angular/core/testing';

import { GroupAndCategoryService } from './group-and-category.service';

describe('GroupAndCategoryService', () => {
  let service: GroupAndCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupAndCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
